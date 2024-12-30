import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill, SkillsService } from '../skills.service';

@Component({
  selector: 'app-skill-set-matrix',
  templateUrl: './skill-set-matrix.component.html',
  standalone: false,
  styleUrl: './skill-set-matrix.component.scss'
})
export class SkillSetMatrixComponent {
  isModalOpen = false;
  skillForm: FormGroup;
  skills: Skill[] = [];
  today: string;
  filteredSkills = [...this.skills]; // Initialize filteredSkills with all skills
  isFilterModalOpen = false;
   filterForm: FormGroup;

  constructor(private fb: FormBuilder, private skillService: SkillsService) {

    this.filterForm = this.fb.group({
      skillName: ['']
    });

    this.today = new Date().toISOString().split('T')[0];

    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      targetCompletionDate: ['', Validators.required],
      startDate: ['', Validators.required],
      category: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      lastUpdate: ['', Validators.required],
      successCriteria: ['', [Validators.required, Validators.maxLength(1000)]]
      
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  onSubmit() {
    // Mark all controls as touched
    Object.keys(this.skillForm.controls).forEach(field => {
      const control = this.skillForm.get(field);
      if (control) {
        control.markAsTouched(); // Mark control as touched
      }
    });
  
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;
  
      // Add new skill
      this.skillService.addSkill(skill).subscribe(() => {
        this.closeModal();
        this.loadSkills(); // Reload skills after adding
      });
    }
  }
  

  loadSkills() {
    this.skillService.getSkills().subscribe((skills: Skill[]) => {
      this.skills = skills; // Populate the skills array
    });
  }

  resetForm() {
    this.skillForm.reset();
  }

  // Add a method to delete skills as needed
  deleteSkill(skillId: number) {
    this.skills = this.skills.filter(skill => skill.id !== skillId);
    this.filteredSkills = this.filteredSkills.filter(skill => skill.id !== skillId); // Also update the filtered list
  }

  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  applyFilter() {
    const filterValue = this.filterForm.get('skillName')?.value.toLowerCase();

    if (filterValue) {
      this.filteredSkills = this.skills.filter(skill =>
        skill.name.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredSkills = [...this.skills]; // If no input, show all skills
    }

    this.closeFilterModal(); // Close the filter modal
  }

  resetFilter() {
    this.filterForm.reset({
      skillName: ''
    });
    this.filteredSkills = [...this.skills]; // Reset to show all skills
    this.closeFilterModal(); // Close the filter modal after resetting
  }

}
