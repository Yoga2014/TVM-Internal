import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

export interface EmployeeProfile {
  employeeName: string;
  employeeCode: string;
  designation: string;
  department: string;
  team: string;
  location: string;
  dob: string;
  personalEmail: string;
  aadhaarNo: string;
  panNo: string;
  alternateMobile: string;
  currentAddress: string;
  permanentAddress: string;
  bankAccount: string;
  salaryAccountNo: string;
  ifscCode: string;
  joiningDate: string;
  employeeType: string;
  lastWorkingDay?: string;
  projectId: string;
  employeeStatus: string;
  salary: number;
  createdAt: string;
  id: number;
}

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit {

  profiledata!: EmployeeProfile;   

  activeCard: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data: EmployeeProfile[]) => {
      this.profiledata = data[0];   
    });
  }

  toggleCard(card: string) {
    this.activeCard = this.activeCard === card ? null : card;
  }
}
