import { Component, OnInit } from '@angular/core';
import { AdminleaveService } from 'src/app/AllServices/adminleaveserivce';
import { LeaveRequest } from 'src/app/Interface/leave-request.model';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-adminrequest',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminrequestComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];
  selectedRequests: LeaveRequest[] = [];

  constructor(
    private AdminleaveService: AdminleaveService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  // ================= LOAD REQUESTS =================
  loadLeaveRequests(): void {
    this.AdminleaveService.getLeaves().subscribe({
      next: (data) => {
        this.leaveRequests = data.map(req => ({
          ...req,
          leavePeriod: `${req.startDate} → ${req.endDate}`,
          approvedBy: req.approvedBy ?? '—',
          selected: false
        }));

        this.filteredRequests = [...this.leaveRequests];
      },
      error: err => {
        console.error('Failed to load leaves', err);
        this.toastService.error('Failed to load leave requests');
      }
    });
  }

  // ================= SUMMARY + REFRESH =================
  getSummaryAndRefresh(): void {
    this.AdminleaveService.getLeaveSummary().subscribe({
      next: () => {
        // ✅ After summary success → reload requests
        this.loadLeaveRequests();
      },
      error: err => {
        console.error('Summary API failed', err);
        this.toastService.error('Failed to refresh data');
      }
    });
  }

  // ================= APPROVE / REJECT =================
 updateStatus(req: LeaveRequest, status: 'Approved' | 'Rejected') {

  const payload = {
    leaveId: req.id,
    status: status.toUpperCase(),
    role: 'ADMIN'
  };

  this.AdminleaveService.updateLeaveRequest(payload).subscribe({
    next: () => {
      req.status = status;
      req.approvedBy = 'Admin';

      this.toastService.success(`Leave ${status} Successfully`);

      // ✅ ONLY refresh list (NO summary call)
      this.loadLeaveRequests();
    },
    error: err => {
      console.error(err);
      this.toastService.error('Failed to update leave');
    }
  });
}

  // ================= SELECT ALL =================
  selectAll(event: any) {
    const checked = event.target.checked;

    this.filteredRequests.forEach(x => x.selected = checked);

    this.selectedRequests = checked
      ? [...this.filteredRequests]
      : [];
  }

  // ================= SINGLE ROW SELECT =================
  onRowSelect(event: any, request: LeaveRequest) {
    request.selected = event.target.checked;

    if (request.selected) {
      this.selectedRequests.push(request);
    } else {
      this.selectedRequests =
        this.selectedRequests.filter(r => r.id !== request.id);
    }
  }

  // ================= DELETE =================
  deleteSelectedRequests() {

    if (this.selectedRequests.length === 0) {
      this.toastService.error('Select at least one request');
      return;
    }

    const deletes = this.selectedRequests.map(req =>
      this.AdminleaveService.deleteLeaveRequest(String(req.id))
    );

    Promise.all(deletes.map(d => d.toPromise() as Promise<any>))
      .then(() => {
        this.toastService.success('Selected requests deleted');

        this.selectedRequests = [];

        // ✅ Refresh after delete
        this.loadLeaveRequests();
      })
      .catch(err => {
        console.error(err);
        this.toastService.error('Delete failed');
      });
  }
}