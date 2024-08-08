import { Component } from '@angular/core';
import { slideInAnimation } from './animation';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [slideInAnimation]

})
export class HeaderComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
