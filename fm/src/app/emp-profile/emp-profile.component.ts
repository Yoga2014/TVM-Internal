import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-emp-profile',
  standalone: false,
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit{
  profiledata:any;
  avatarInitials: string = '';

  constructor(private profileService: ProfileService){}

  ngOnInit(){
    this.profileService.getProfile().subscribe((data:any)=>{
      this.profiledata = data;
    })
  }

  activeCard: string | null = null;

  toggleCard(card: string){
    this.activeCard  =  this.activeCard ===  card ? null :card
  }

}
