import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/AllServices/leave.service';
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

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
      
    this.leaveService.getLeaves().subscribe({
      next: (data) => {
        this.leaveRequests = data.map(req => ({
          ...req,
          leavePeriod: `${req.startDate} → ${req.endDate}`,
          approvedBy: req.approvedBy ?? "—",
          selected: false 
        }));
        this.filteredRequests = [...this.leaveRequests];
      },
      error: (err) => console.error("Failed to load leaves", err)
    });
  }

  updateStatus(req: LeaveRequest, status: "Approved" | "Rejected") {
    const leaveId = String(req.id);

    const updatedReq = {
      ...req,
      status,
      approvedBy: "Admin"
    };

    this.leaveService.updateLeaveRequest(leaveId, updatedReq).subscribe({
      next: (response) => {
        const updatedRow = response ?? updatedReq;
        const index = this.filteredRequests.findIndex(x => x.id === req.id);
        if (index !== -1) this.filteredRequests[index] = updatedRow;

        alert(`Leave ${status} Successfully`);
      },
      error: (err) => {
        console.error("Update failed", err);
        alert("Failed to update leave status.");
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
      this.selectedRequests = this.selectedRequests.filter(r => r.id !== request.id);
    }
  }

  deleteSelectedRequests() {
    if (this.selectedRequests.length === 0) {
      alert("Select at least one request");
      return;
    }

    const deleteObservables = this.selectedRequests.map(req =>
      this.leaveService.deleteLeaveRequest(String(req.id))
    );

    // Execute all deletions and reload once
    Promise.all(deleteObservables.map(obs => obs.toPromise()))
      .then(() => {
        alert("Selected requests deleted successfully");
        this.selectedRequests = [];
        this.loadLeaveRequests();
      })
      .catch(err => {
        console.error("Delete failed", err);
        alert("Failed to delete some requests.");
      });
  }
}
