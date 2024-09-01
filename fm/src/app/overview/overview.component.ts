import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  selectedTab: any = '';
  bootstrap: any;

  aditionalClick(getValues: any) {
    this.selectedTab = getValues;
  }
}
