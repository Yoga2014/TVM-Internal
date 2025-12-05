import { Component } from '@angular/core';
import { AuthService } from '../AllServices/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent {
//   isLoggedIn=false;

//   constructor(private authservice: AuthService, private router: Router) {}

//    handleLoginSuccess(): void {
//     this.isLoggedIn = true;
//   }

//   navigateTo(link: string, path: string) {
//   if (link === 'logout') {
//     const confirmed = confirm('Do you really want to logout?');
//     if (confirmed) {
//       this.authservice.logout(); 
//       this.isLoggedIn = false; 
//       this.router.navigate(['login']).catch((err) => console.error(err));
//     }
//     return; 
//   }

//   this.activeLink = link;
//   this.router.navigate([path]).catch((err) => console.error('Navigation error:', err));
// }

}
