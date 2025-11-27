import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';

@Component({
  selector: 'app-adminrequest',
  templateUrl: './adminrequest.component.html',
  styleUrls: ['./adminrequest.component.scss']
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
          approvedBy: req.approvedBy ?? "—"
        }));

        this.filteredRequests = [...this.leaveRequests];
      }
    });
  }
    
updateStatus(req: any, status: string) {

  const leaveId = req.id; // ✔ use string ID

  const updatedReq = {
    ...req,
    status: status,
    approvedBy: "Admin"
  };

  this.leaveService.updateLeaveRequest(leaveId, updatedReq).subscribe({
    next: (response) => {

      const updatedRow = response ?? updatedReq;

      const index = this.filteredRequests.findIndex(x => x.id === leaveId);
      if (index !== -1) {
        this.filteredRequests[index] = updatedRow;
      }

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
    if (event.target.checked) {
      this.selectedRequests.push(request);
    } else {
      this.selectedRequests = this.selectedRequests.filter(r => r !== request);
    }
  }

  deleteSelectedRequests() {
    if (this.selectedRequests.length === 0) {
      alert("Select at least one request");
      return;
    }

    this.selectedRequests.forEach(req => {
      const leaveId = String(req.id);
this.leaveService.deleteLeaveRequest(leaveId).subscribe(() => {

        this.loadLeaveRequests();
      });
    });

    this.selectedRequests = [];
  }
}
