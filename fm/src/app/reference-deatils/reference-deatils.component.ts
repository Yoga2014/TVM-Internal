import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router} from '@angular/router'; // Import RouterModule
import { ServerService } from '../server.service';


@Component({
  selector: 'app-reference-deatils',
  standalone: false,
 // imports: [ReactiveFormsModule, RouterModule, CommonModule],  // Import necessary modules here
  templateUrl: './reference-deatils.component.html',
  styleUrls: ['./reference-deatils.component.scss'],
  animations: [
    trigger('popupAnimation', [
      state('void', style({
        transform: 'scale(0.9)',
        opacity: 0
      })),
      state('*', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition('void => *', animate('800ms ease-out')),
      transition('* => void', animate('200ms ease-in'))
    ])
  ]
})
export class ReferenceDeatilsComponent {
  personForm: FormGroup; // Changed form name to personForm for the new data model
  showPopup = false;
  currentIndex: number | null = null;

  people: any[] = [];  // Renamed from skills to people, as the new structure reflects personal information

  constructor(private route: Router, private fb: FormBuilder, private server: ServerService) {
    this.personForm = this.fb.group({
      fullName: ['', Validators.required],
      relationship: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Added regex for 10 digit phone numbers
      business: ['', Validators.required]
    });
  }

  // Edit existing person record
  editPerson(person: any, index: number) {
    this.personForm.patchValue(person);
    this.currentIndex = index;
    this.showPopup = true;
  }

  // Save form data (add new or update existing)
  onSave() {
    if (this.personForm.valid) {
      const personData = this.personForm.value;

      if (this.currentIndex !== null) {
        // Update existing person
        this.people[this.currentIndex] = personData;
      } else {
        // Add new person
        this.people.push(personData);
      }

      // Call server method to save the data
      this.server.ReferencePostMethod(personData).subscribe(() => {
        this.showPopup = false;
        this.currentIndex = null; // Reset index after save
      });
    }
  }

  // Close the modal without saving
  onClose() {
    this.showPopup = false;
    this.currentIndex = null;
  }

  // Open modal to add a new person
  addPerson() {
    this.personForm.reset(); // Reset the form
    this.currentIndex = null; // Reset the index
    this.showPopup = true; // Show the popup
  }

  // Delete person row
  deleteRow(index: number): void {
    this.people.splice(index, 1);
  }

  // Navigate to next page (for example, professional details)
  nextClick() {
    this.route.navigate(['/professional']);
  }
}
