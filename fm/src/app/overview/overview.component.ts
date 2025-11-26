import { Component, OnInit } from '@angular/core';
import { OverviewService, OverviewData } from '../AllServices/overviewservice';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  selectedTab: any = '';
  isPopupVisible = false;

  totalEmployees: number = 0;
  presentToday: number = 0;
  absentToday: number = 0;
  leaveToday: number = 0;
  newJoinees: number = 0;
  resignations: number = 0;
  departmentCount: number = 0;

  constructor(private overviewService: OverviewService) {}

  ngOnInit() {
    this.fetchOverviewData();
  }

  fetchOverviewData() {
    this.overviewService.getOverviewData().subscribe({
      next: (data: OverviewData) => {
        this.totalEmployees = data.totalEmployees;
        this.presentToday = data.presentToday;
        this.absentToday = data.absentToday;
        this.leaveToday = data.leaveToday;
        this.newJoinees = data.newJoinees;
        this.resignations = data.resignations;
        this.departmentCount = data.departmentCount;
      },
      error: (err) => {
        console.error('Error fetching overview data:', err);
      }
    });
  }

  aditionalClick(getValues: any) {
    this.selectedTab = getValues;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
