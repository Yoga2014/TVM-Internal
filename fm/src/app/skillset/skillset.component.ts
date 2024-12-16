import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
@Component({
  selector: 'app-skillset',

  templateUrl: './skillset.component.html',
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


  constructor( private route:Router, private fb: FormBuilder,private server: ServerService){
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      yof: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  skills: any[] = []

  editSkill(skill: any, index: number) {
    this.skillForm.patchValue(skill);
    this.currentIndex = index;
    this.showPopup = true;
  }

  onSave() {
    if (this.skillForm.valid) {
      const skillData = this.skillForm.value;
  
      if (this.currentIndex !== null) {
        // Update existing skill
        this.skills[this.currentIndex] = skillData;
      } else {
        // Add new skill
        this.skills.push(skillData);
      }
  
      // Call server method to save data
      this.server.SkillsMethod(skillData).subscribe(() => {
        this.showPopup = false;
        this.currentIndex = null; // Reset index after save
      });
    }
  }
  onClose() {
    this.showPopup = false;
    this.currentIndex = null;
  }
  addSkill() {
    this.skillForm.reset(); // Reset the form
    this.currentIndex = null; // Reset the index
    this.showPopup = true; // Show the popup
  }

  deleteRow(index: number): void {
    this.skills.splice(index, 1);
  }

  nextClick(){
    this.route.navigate(['/professional'])
    }

}