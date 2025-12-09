import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/AllServices/employee.service';

@Component({
  selector: 'app-total-employee',
  standalone: false,
  templateUrl: './total-employee.component.html',
  styleUrl: './total-employee.component.scss'
})
export class TotalEmployeeComponent implements OnInit {

  searchText: string = '';
 filteredData: any[] = [];

  datas: any = [
    {
      employeeId: "EMP1001",
      photo: "https://randomuser.me/api/portraits/men/20.jpg",
      firstName: "John",
      lastName: "Mathew",
      dateOfBirth: "1993-03-10",
      gender: "Male",
      designation: "Java Developer",
      bloodGroup: "A+",
      maritalStatus: "Married",
      contactDetails: {
        mobileNumber: "+91 9123456780",
        personalEmailId: "john.mathew@example.com",
        permanentAddress: "45, Lake View Road",
        city: "Bangalore",
        district: "Bangalore Urban",
        locality: "BTM Layout",
        landmark: "Opp. Reliance Trends",
        pincode: "560076",
        state: "Karnataka",
        country: "India",
        havePassport: "Yes",
        haveVisa: "Yes"
      }
    },
    {
      employeeId: "EMP1002",
      photo: "https://randomuser.me/api/portraits/women/35.jpg",
      firstName: "Priya",
      lastName: "Sharma",
      dateOfBirth: "1998-11-25",
      gender: "Female",
      designation: "Angular Developer",
      bloodGroup: "B+",
      maritalStatus: "Single",
      contactDetails: {
        mobileNumber: "+91 9797979797",
        personalEmailId: "priya.sharma@example.com",
        permanentAddress: "25, Rose Garden Street",
        city: "Mumbai",
        district: "Mumbai Suburban",
        locality: "Andheri",
        landmark: "Near Metro Station",
        pincode: "400058",
        state: "Maharashtra",
        country: "India",
        havePassport: "No",
        haveVisa: "No"
      }
    },
    {
      employeeId: "EMP1003",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      firstName: "Arun",
      lastName: "Kumar",
      dateOfBirth: "1995-07-18",
      gender: "Male",
      designation: "PHP Developer",
      bloodGroup: "O+",
      maritalStatus: "Single",
      contactDetails: {
        mobileNumber: "+91 9988776655",
        personalEmailId: "arun.kumar@example.com",
        permanentAddress: "12, Gandhi Street",
        city: "Chennai",
        district: "Chengalpattu",
        locality: "Tambaram",
        landmark: "Near MCC College",
        pincode: "600059",
        state: "Tamil Nadu",
        country: "India",
        havePassport: "Yes",
        haveVisa: "No"
      }
    },
    {
      employeeId: "EMP1004",
      photo: "https://randomuser.me/api/portraits/women/28.jpg",
      firstName: "Sneha",
      lastName: "Reddy",
      dateOfBirth: "1997-01-15",
      gender: "Female",
      designation: "UI/UX Designer",
      bloodGroup: "AB+",
      maritalStatus: "Single",
      contactDetails: {
        mobileNumber: "+91 9090909090",
        personalEmailId: "sneha.reddy@example.com",
        permanentAddress: "9, Rosewood Apartments",
        city: "Hyderabad",
        district: "Ranga Reddy",
        locality: "Gachibowli",
        landmark: "Near Infosys Campus",
        pincode: "500032",
        state: "Telangana",
        country: "India",
        havePassport: "No",
        haveVisa: "No"
      }
    },    {
      employeeId: "EMP1001",
      photo: "https://randomuser.me/api/portraits/men/20.jpg",
      firstName: "John",
      lastName: "Mathew",
      dateOfBirth: "1993-03-10",
      gender: "Male",
      designation: "Java Developer",
      bloodGroup: "A+",
      maritalStatus: "Married",
      contactDetails: {
        mobileNumber: "+91 9123456780",
        personalEmailId: "john.mathew@example.com",
        permanentAddress: "45, Lake View Road",
        city: "Bangalore",
        district: "Bangalore Urban",
        locality: "BTM Layout",
        landmark: "Opp. Reliance Trends",
        pincode: "560076",
        state: "Karnataka",
        country: "India",
        havePassport: "Yes",
        haveVisa: "Yes"
      }
    },
    {
      employeeId: "EMP1002",
      photo: "https://randomuser.me/api/portraits/women/35.jpg",
      firstName: "Priya",
      lastName: "Sharma",
      dateOfBirth: "1998-11-25",
      gender: "Female",
      designation: "Angular Developer",
      bloodGroup: "B+",
      maritalStatus: "Single",
      contactDetails: {
        mobileNumber: "+91 9797979797",
        personalEmailId: "priya.sharma@example.com",
        permanentAddress: "25, Rose Garden Street",
        city: "Mumbai",
        district: "Mumbai Suburban",
        locality: "Andheri",
        landmark: "Near Metro Station",
        pincode: "400058",
        state: "Maharashtra",
        country: "India",
        havePassport: "No",
        haveVisa: "No"
      }
    },
    {
      employeeId: "EMP1003",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      firstName: "Arun",
      lastName: "Kumar",
      dateOfBirth: "1995-07-18",
      gender: "Male",
      designation: "PHP Developer",
      bloodGroup: "O+",
      maritalStatus: "Single",
      contactDetails: {
        mobileNumber: "+91 9988776655",
        personalEmailId: "arun.kumar@example.com",
        permanentAddress: "12, Gandhi Street",
        city: "Chennai",
        district: "Chengalpattu",
        locality: "Tambaram",
        landmark: "Near MCC College",
        pincode: "600059",
        state: "Tamil Nadu",
        country: "India",
        havePassport: "Yes",
        haveVisa: "No"
      }
    }
  ];

  constructor(private employeeService: EmployeeService, private route: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        console.log("API Response:", res);
        this.datas = res;
      },
      error: (err) => {
        console.log("Error loading employees", err);
      }
    });
  }

viewEmployee(data: any) {
  this.employeeService.setSelectedEmployee(data.employeeCode);   // pass only employeeCode
  window.dispatchEvent(new Event("showParticularTab"));
}

}