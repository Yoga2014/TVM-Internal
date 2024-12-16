  import { Component, OnInit } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { slideInAnimation } from './animation';
  import { PlatformLocation } from '@angular/common';

  @Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrl: './onboarding.component.scss'
  })
  export class OnboardingComponent implements OnInit {

    constructor(private platformLocation: PlatformLocation) {
      this.platformLocation.onPopState(() => {
        this.goToPreviousTab();
      });
    }
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
    activeNavItem: string = 'general';
    navItems = ['general', 'educational', 'skillset', 'professional', 'details', 'personalDataForm']; 

    selectTab(tabName: string) {
      this.activeNavItem = tabName;
      history.pushState(null, '', window.location.href);
    }

    prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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
