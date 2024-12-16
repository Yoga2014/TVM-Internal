import { Component } from '@angular/core';
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { SkillsetComponent } from "../skillset/skillset.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [slideInAnimation],
})
export class HeaderComponent {

  activeNavItem: string = 'details';
  navItems = ['details', 'personalDataForm']; 

  constructor(private platformLocation: PlatformLocation) {
    this.platformLocation.onPopState(() => {
      this.goToPreviousTab();
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  selectTab(tabName: string) {
    this.activeNavItem = tabName;
    history.pushState(null, '', window.location.href);
  }

  nextClick() {
    const currentIndex = this.navItems.indexOf(this.activeNavItem);
    if (currentIndex < this.navItems.length - 1) {
      this.activeNavItem = this.navItems[currentIndex + 1];
      history.pushState(null, '', window.location.href);
    }
  }

  isLastTab() {
    return this.activeNavItem === this.navItems[this.navItems.length - 1];
  }

  goToPreviousTab() {
    const currentIndex = this.navItems.indexOf(this.activeNavItem);
    if (currentIndex > 0) {
      this.activeNavItem = this.navItems[currentIndex - 1];
    } else {
      history.pushState(null, '', window.location.href);
    }
  }

}
