import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

export interface EmployeeProfile {
  firstName: string;
  lastName: string;
  photoUrl?: string;

  designation: string;
  employeeCode: string;

  dob: string;
  joinDate: string;
  maritalStatus?: string;

  personalMobileNum?: string;
  email: string;
  department: string;
  tvmRole: string;

  presentAddress?: string;
  permanentAddress?: string;

  employmentType?: string;
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
