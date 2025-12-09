import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLeaveComponent } from '../leave-summary/apply-leave/apply-leave.component';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];
  selectedRequests: LeaveRequest[] = [];

  constructor(private leaveService: LeaveService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaves().subscribe({
      next: (data) => {
        this.leaveRequests = data.map(req => ({
          ...req,
          leavePeriod: `${req.startDate} to ${req.endDate}`,
          approvedBy: req.approvedBy ?? "—"
        }));

        this.filteredRequests = [...this.leaveRequests];
      },
      error: (err) => console.error('Error fetching leave requests:', err),
    });
  }

  applyFilter(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredRequests = this.leaveRequests.filter(req =>
      (req.leaveType ?? '').toLowerCase().includes(value) ||
      (req.status ?? '').toLowerCase().includes(value)
    );
  }

  applyLeave(): void {
    const dialogRef = this.dialog.open(ApplyLeaveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leaveService.addLeaveRequest(result).subscribe({
          next: () => this.loadLeaveRequests(),
          error: (err) => console.error('Error adding leave request:', err),
        });
      }
    });
  }

  selectAll(event: any): void {
    const checked = event.target.checked;
    this.filteredRequests.forEach(req => req.selected = checked);

    this.selectedRequests = checked ? [...this.filteredRequests] : [];
  }

  onRowSelect(event: any, request: LeaveRequest): void {
    const checked = event.target.checked;

    if (checked) {
      this.selectedRequests.push(request);
    } else {
      this.selectedRequests = this.selectedRequests.filter(r => r !== request);
    }
  }

  deleteSelectedRequests(): void {
  if (this.selectedRequests.length === 0) {
    alert("Select at least one request to delete.");
    return;
  }

  if (confirm("Are you sure you want to delete selected leave requests?")) {

    this.selectedRequests.forEach(req => {

      const id =
        (req as any).id ||
        (req as any).leaveId ||
        (req as any)._id ||
        (req as any).requestId;

      if (!id) {
        console.error("No valid ID found for:", req);
        return;
      }

      this.leaveService.deleteLeaveRequest(id).subscribe({
        next: () => this.loadLeaveRequests(),
        error: err => console.error("Delete failed:", err)
      });

    });

    this.selectedRequests = [];
  }
}

}
