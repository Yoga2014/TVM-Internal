export interface LeaveRequest {
  id: number;
  employeeCode: string;
  employeeName: string;
  leaveNote: string;
  status: string;
  leaveDate: string;
}

export interface Anniversary {
  employeeCode: string;
  name: string;
  designation: string;
}

export interface DepartmentCounts {
  FRONTEND: number;
  FULLSTACK: number;
  BACKEND: number;
}

export interface OverviewData {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  newJoineesThisMonth: number;
  totalProjects: number;
  departmentCounts: DepartmentCounts;
  leaveRequests: LeaveRequest[];
  anniversariesToday: Anniversary[];
  birthdaysToday: Anniversary[];
}
