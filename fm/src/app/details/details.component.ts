import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Profile } from '../interfaces/profile.interface';
import { Profile,FamilyMember,Language } from '../Interface/workers';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  profiles: Profile[] = []; 
  filteredProfiles: Profile[] = []; 
  selectedRows: Profile[] = []; 
  apiUrl: string = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProfiles();
  }

  
  fetchProfiles(): void {
    this.http.get<Profile[]>(this.apiUrl).subscribe(
      (data) => {
        this.profiles = data;
        this.filteredProfiles = [...this.profiles]; 
      },
      (error) => console.error('Error fetching profiles:', error)
    );
  }


  filterWorkers(activeStatus: string): void {
    if (activeStatus === 'all') {
      this.filteredProfiles = [...this.profiles];
    } else {
      this.filteredProfiles = this.profiles.filter(profile => 
        profile.maritalStatus === activeStatus 
      );
    }
  }

  
  toggleSelection(event: Event, profile: Profile): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedRows.push(profile);
    } else {
      this.selectedRows = this.selectedRows.filter(row => row.id !== profile.id);
    }
  }

  
  selectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedRows = isChecked ? [...this.filteredProfiles] : [];
  }

 
  deleteSelectedRows(): void {
    if (confirm('Are you sure you want to delete the selected rows?')) {
      const deleteRequests = this.selectedRows.map(profile => 
        this.http.delete(`${this.apiUrl}/${profile.id}`).toPromise()
      );

      Promise.all(deleteRequests).then(() => {
        this.selectedRows.forEach(row => {
          this.profiles = this.profiles.filter(profile => profile.id !== row.id);
        });
        this.filteredProfiles = [...this.profiles];
        this.selectedRows = [];
      }).catch(error => console.error('Error deleting profiles:', error));
    }
  }

 
  get allSelected(): boolean {
    return this.selectedRows.length === this.filteredProfiles.length && this.selectedRows.length > 0;
  }

 
  viewProfile(profile: Profile): void {
    console.log('Viewing profile:', profile);
  }
}
