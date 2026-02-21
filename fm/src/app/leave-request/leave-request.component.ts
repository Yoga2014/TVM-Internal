import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  showApplyModal = false;
  applyModel: { startDate: string; endDate: string; reason: string; leaveType?: string } = {
    startDate: '',
    endDate: '',
    reason: '',
    leaveType: 'Casual'
  };
  notificationMessage: string | null = null;
  private _notifTimer: any = null;

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
      const exists = this.selectedRequests.find(r => r.id === req.id);
      if (!exists) this.selectedRequests.push(req);
    } else {
      this.selectedRequests = this.selectedRequests.filter(r => r.id !== req.id);
    }
  }

  deleteSelectedRequests() {
    if (!this.selectedRequests || this.selectedRequests.length === 0) {
      alert('Select at least one request');
      return;
    }

    if (!confirm('Are you sure you want to delete selected request(s)?')) return;

    const ids = this.selectedRequests
      .map(r => Number((r as any).id))
      .filter(id => !isNaN(id));

    if (ids.length === 0) {
      alert('Selected requests do not have valid IDs');
      return;
    }

    const calls = ids.map(id => this.leaveService.deleteLeaveRequest(id));

    forkJoin(calls).subscribe({
      next: () => {
        this.loadLeaveRequests();
        this.selectedRequests = [];
      },
      error: err => {
        console.error('Error deleting requests', err);
        alert('An error occurred while deleting requests');
      }
    });
  }

  applyLeave() {
    this.showApplyModal = true;
  }

  closeApplyModal() {
    this.showApplyModal = false;
    this.applyModel = { startDate: '', endDate: '', reason: '', leaveType: 'Casual' };
  }

  submitApply() {
    if (!this.applyModel.startDate || !this.applyModel.endDate) {
      alert('Please provide start and end dates');
      return;
    }

    const payload = {
      employeeId: this.employeeId,
      startDate: this.applyModel.startDate,
      endDate: this.applyModel.endDate,
      reason: this.applyModel.reason,
      leaveType: this.applyModel.leaveType
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        this.showNotification(`Leave submitted successfully for employee ${this.employeeId}`);
        this.loadLeaveRequests();
        this.closeApplyModal();
      },
      error: err => console.error(err)
    });
  }

  showNotification(message: string, ms = 4000) {
    this.notificationMessage = message;
    if (this._notifTimer) clearTimeout(this._notifTimer);
    this._notifTimer = setTimeout(() => (this.notificationMessage = null), ms);
  }

  ngOnDestroy(): void {
    if (this._notifTimer) clearTimeout(this._notifTimer);
  }
}
