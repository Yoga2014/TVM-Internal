export interface LeaveRequest {
  employeeId?: string;
  employeeName?: string;
  leaveType?: any;
  available?: number;
  booked?: number;
  iconClass?: string;
  teamEmail?: string;
  designation?: string;
  teamId?: string;
  type?: string;
  leavePeriod?: string;
  startDate?: string;
  endDate?: string;
  totalDays?: number;
  reasonforLeave?: string;
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Upcoming';
  dateOfRequest?: string;
  selected?: boolean;
  comment?: string;
  reasonforRejected?: string;
  color?: string;
  rejectionComment?: string;
  typeLeave?: string;
  email?: string;
  total?: number; // Add the 'total' property to the LeaveRequest interface
  reason?: string; // Add the 'reason' property to the LeaveRequest interface
  approvedBy?: string; // Add the 'approvedBy' property to the LeaveRequest interface
}
