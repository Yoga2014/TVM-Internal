import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OverviewService } from '../AllServices/overviewservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  selectedTab: any = '';
  isPopupVisible = false;

  // Dashboard values
  totalEmployees = 0;
  presentToday = 0;
  absentToday = 0;
  newJoinees = 0;
  totalProjects = 0;
  leaveCount = 0;
  departmentCount = 0;
  anniversaryCount = 0;
  birthdayCount = 0;


  // Nested + list data
  departmentCounts: any = {};
  leaveRequests: any[] = [];
  anniversariesToday: any[] = [];
  birthdaysToday: any[] = [];

  constructor(private overviewService: OverviewService, private router: Router, private route: ActivatedRoute) { }
  @Output() navigateToProject = new EventEmitter<void>();
  @Output() navigateToPresentEmployee = new EventEmitter<void>();


  ngOnInit() {
    this.overviewService.getOverviewData().subscribe(data => {
      this.totalEmployees = data.totalEmployees;
      this.presentToday = data.presentToday;
      this.absentToday = data.absentToday;
      this.leaveCount = data.leaveRequests.length;
      this.newJoinees = data.newJoineesThisMonth;
      this.departmentCount = Object.keys(data.departmentCounts).length;
      this.totalProjects = data.totalProjects;
      this.anniversaryCount = data.anniversariesToday.length;
      this.birthdayCount = data.birthdaysToday.length;
      console.log("Dashboard →", data);
    });
  }

  aditionalClick(getValues: any) {
    this.selectedTab = getValues;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
  openTotalEmployee() {
    window.dispatchEvent(new Event("showTotalEmployeeTab"));
  }
  openTotalProject() {
    this.router.navigate(['/new-home/teams-dashboard/projects']);
  }
  openLeaveRequest() {
    this.router.navigate(['/leave-approve']);
  }
  openPresentEmployee() {
    window.dispatchEvent(new Event("showPresentEmployeeTab"));
  }
}
