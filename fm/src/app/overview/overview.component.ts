import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  standalone: false,
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  selectedTab: any = '';
  bootstrap: any;
  isPopupVisible = false;

  // Add missing properties with default values
  totalEmployees: number = 0;
  presentToday: number = 0;
  absentToday: number = 0;
  leaveToday: number = 0;
  newJoinees: number = 0;
  resignations: number = 0;
  departmentCount: number = 0;

  aditionalClick(getValues: any) {
    this.selectedTab = getValues;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
