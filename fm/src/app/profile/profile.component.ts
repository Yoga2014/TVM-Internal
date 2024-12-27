import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: any = {};  // Holds the profile data from JSON
  editedData: any = {};   // Holds the updated/added data

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    // Fetch profile data on component load
    this.profileService.getProfile().subscribe(data => {
      this.profileData = data;
      this.editedData = JSON.parse(JSON.stringify(data));  // Clone for editing
    });
  }

  // Handle form submission (PUT operation)
  submitForm() {
    this.profileService.updateProfile(this.editedData).subscribe(updated => {
      console.log('Profile updated successfully:', updated);
    });
  }

  // Update the editedData as the user makes changes
  onInputChange(section: string, field: string, value: any) {
    if (!this.editedData[section]) {
      this.editedData[section] = {};
    }
    this.editedData[section][field] = value;
  }
}
