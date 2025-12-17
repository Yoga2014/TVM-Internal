import { Component, OnInit } from '@angular/core';
import { AdminleaveService } from 'src/app/AllServices/adminleaveserivce';
import { LeaveRequest } from 'src/app/Interface/leave-request.model';

@Component({
  selector: 'app-adminrequest',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminrequestComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];
  selectedRequests: LeaveRequest[] = [];

  constructor(private AdminleaveService: AdminleaveService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

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
      error: err => console.error('Failed to load leaves', err)
    });
  }

  updateStatus(req: LeaveRequest, status: 'Approved' | 'Rejected') {

    this.AdminleaveService.updateLeaveRequest(String(req.id), status).subscribe({
      next: () => {
        req.status = status;
        req.approvedBy = 'Admin';
        alert(`Leave ${status} Successfully`);
      },
      error: err => {
        console.error(err);
        alert('Failed to update leave');
      }
    });
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.filteredRequests.forEach(x => x.selected = checked);
    this.selectedRequests = checked ? [...this.filteredRequests] : [];
  }

  onRowSelect(event: any, request: LeaveRequest) {
    request.selected = event.target.checked;

    if (request.selected) {
      this.selectedRequests.push(request);
    } else {
      this.selectedRequests =
        this.selectedRequests.filter(r => r.id !== request.id);
    }
  }

  deleteSelectedRequests() {
    if (this.selectedRequests.length === 0) {
      alert('Select at least one request');
      return;
    }

    const deletes = this.selectedRequests.map(req =>
      this.AdminleaveService.deleteLeaveRequest(String(req.id))
    );

    Promise.all(deletes.map(d => d.toPromise() as Promise<any>))
      .then(() => {
        alert('Selected requests deleted');
        this.selectedRequests = [];
        this.loadLeaveRequests();
      })
      .catch(err => {
        console.error(err);
        alert('Delete failed');
      });
  }
}
