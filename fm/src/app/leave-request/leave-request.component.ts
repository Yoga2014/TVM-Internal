import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../AllServices/leave.service';
import { EmployeeAuthService } from '../AllServices/EmployeeAuthService';
import { LeaveRequest } from '../Interface/leave-request.model';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];
  selectedRequests: LeaveRequest[] = [];

  employeeId!: number;

  constructor(
    private leaveService: LeaveService,
    private authService: EmployeeAuthService
  ) {}

  ngOnInit(): void {
    const emp = this.authService.getAuthenticatedEmployee();
    this.employeeId = emp.employeeId;
    this.loadLeaveRequests();
  }

  loadLeaveRequests() {
    this.leaveService.getMyLeaveRequests(this.employeeId).subscribe({
      next: data => {
        this.leaveRequests = data.map((req: any) => ({
          ...req,
          leavePeriod: `${req.startDate} → ${req.endDate}`,
          approvedBy: req.approvedBy ?? '—',
          selected: false
        }));
        this.filteredRequests = [...this.leaveRequests];
      },
      error: err => console.error(err)
    });
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.filteredRequests.forEach(r => (r.selected = checked));
    this.selectedRequests = checked ? [...this.filteredRequests] : [];
  }

  onRowSelect(event: any, req: LeaveRequest) {
    req.selected = event.target.checked;
    if (req.selected) {
      this.selectedRequests.push(req);
    } else {
      this.selectedRequests = this.selectedRequests.filter(r => r !== req);
    }
  }

  deleteSelectedRequests() {
    if (this.selectedRequests.length === 0) {
      alert('Select at least one request');
      return;
    }

    if (!confirm('Are you sure?')) return;

    this.selectedRequests.forEach(req => {
      this.leaveService.deleteLeaveRequest(Number(req.id)).subscribe({ // Ensure req.id is treated as a number
        next: () => this.loadLeaveRequests(),
        error: err => console.error(err)
      });
    });

    this.selectedRequests = [];
  }

  applyLeave() {
    const payload = {
      employeeId: this.employeeId,
      startDate: '2025-12-20',
      endDate: '2025-12-25',
      reason: 'Vacation'
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        alert('Leave applied successfully');
        this.loadLeaveRequests();
      },
      error: err => console.error(err)
    });
  }
}
