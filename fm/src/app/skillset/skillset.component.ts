import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-skillset',
  templateUrl: './skillset.component.html',
  standalone: false,
  styleUrl: './skillset.component.scss',
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
export class SkillsetComponent {

  skillForm!: FormGroup;
  showPopup = false;
  currentIndex: number | null = null;

  skills: any[] = []; // Array to hold the list of skills

  constructor(private route: Router, private fb: FormBuilder, private server: ServerService) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      experience: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  // Method to edit a skill
  editSkill(skill: any, index: number) {
    this.currentIndex = index; // Set the current index
    this.skillForm.patchValue(skill); // Populate the form with the skill data
    this.showPopup = true; // Show the popup
  }

  // Save skill data (local update)
  onSave() {
    if (this.skillForm.valid) {
      const skillData = this.skillForm.value;
  
      if (this.currentIndex !== null) {
        this.skills[this.currentIndex] = skillData; // Update the skill in the list
      } else {
        this.skills.push(skillData); // Add a new skill
        this.currentIndex = this.skills.length - 1; // Set currentIndex to the new skill
      }
  
      this.showPopup = false; // Close the popup
      this.skillForm.reset(); // Clear the form
    } else {
      console.error('Form is invalid');
    }
  }

  // Send data to the server
  onClick() {
    if (this.skills.length > 0) {
      this.server.SkillsMethod(this.skills).subscribe(
        () => {
          console.log('All skill data saved successfully:', this.skills);
        },
        (error) => {
          console.error('Error saving skill data:', error);
        }
      );
    } else {
      console.error('No skills to save');
    }
  }

  // Close the popup without saving
  onClose() {
    this.showPopup = false;
    this.currentIndex = null;
  }

  // Add a new skill (open the popup with an empty form)
  addSkill() {
    this.skillForm.reset(); // Reset the form
    this.currentIndex = null; // Reset the index
    this.showPopup = true; // Show the popup
  }

  // Delete a skill from the list
  deleteRow(index: number): void {
    this.skills.splice(index, 1);
  }

  // Navigate to the next page
  nextClick() {
    this.route.navigate(['/professional']);
  }
}
