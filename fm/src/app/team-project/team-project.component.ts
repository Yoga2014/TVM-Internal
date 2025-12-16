import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamProjectService } from '../AllServices/TeamProjectService';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-team-project',
  templateUrl: './team-project.component.html',
  styleUrls: ['./team-project.component.scss']
})
export class TeamProjectComponent implements OnInit {

  projectForm!: FormGroup;
  projects: any[] = [];
  showForm = false;
  selectedProject: any = null;

  // 🔹 Employee search
  employeeResults: any[] = [];
  employeeSearch$ = new Subject<string>();
  activeField: 'holder' | 'voice' | null = null;

  // 🔹 Display values (names shown in input)
  projectHolderInput = '';
  projectVoiceInput = '';

  constructor(
    private fb: FormBuilder,
    private teamService: TeamProjectService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadProjects();

    this.employeeSearch$
      .pipe(
        debounceTime(300),
        switchMap(keyword => this.teamService.searchEmployees(keyword))
      )
      .subscribe({
        next: (res: any) => this.employeeResults = res,
        error: err => console.error('Search error', err)
      });
  }

  createForm() {
    this.projectForm = this.fb.group({
      projectHolder: [null, Validators.required], // EMP ID
      projectVoice: [null, Validators.required],  // EMP ID
      projectName: ['', Validators.required],
      vendor: ['', Validators.required],
      clientName: ['', Validators.required],
      parentCompany: ['', Validators.required],
      onboardedDate: ['', Validators.required],
      projectDomain: ['', Validators.required],
      projectStatus: ['', Validators.required]
    });
  }

  openForm() {
    this.showForm = true;
    this.projectForm.reset();
    this.projectHolderInput = '';
    this.projectVoiceInput = '';
  }

  closeForm() {
    this.showForm = false;
  }

  loadProjects() {
    this.teamService.getProjects().subscribe({
      next: res => this.projects = res,
      error: err => console.error(err)
    });
  }

  // 🔹 Search input
  onEmployeeInput(field: 'holder' | 'voice', value: string) {
    this.activeField = field;

    if (field === 'holder') {
      this.projectHolderInput = value;
    } else {
      this.projectVoiceInput = value;
    }

    if (value.length >= 3) {
      this.employeeSearch$.next(value);
    } else {
      this.employeeResults = [];
    }
  }

  // 🔹 Select employee
  selectEmployee(emp: any) {
    if (this.activeField === 'holder') {
      this.projectForm.patchValue({ projectHolder: emp.id });
      this.projectHolderInput = emp.employeeName;
    }

    if (this.activeField === 'voice') {
      this.projectForm.patchValue({ projectVoice: emp.id });
      this.projectVoiceInput = emp.employeeName;
    }

    this.employeeResults = [];
    this.activeField = null;
  }

  onSubmit() {
    if (this.projectForm.invalid) return;

    const payload = {
      projectHolderEmpId: this.projectForm.value.projectHolder,
      projectVoiceEmpId: this.projectForm.value.projectVoice,
      projectName: this.projectForm.value.projectName,
      vendor: this.projectForm.value.vendor,
      clientName: this.projectForm.value.clientName,
      parentCompany: this.projectForm.value.parentCompany,
      onboardedDate: this.projectForm.value.onboardedDate,
      projectDomain: this.projectForm.value.projectDomain,
      projectStatus: this.projectForm.value.projectStatus
    };

    this.teamService.addProject(payload).subscribe({
      next: () => {
        this.loadProjects();
        this.closeForm();
      },
      error: err => console.error(err)
    });
  }

  deleteProject(id: number) {
    if (!confirm('Delete this project?')) return;

    this.teamService.deleteProject(id).subscribe({
      next: () => this.loadProjects(),
      error: err => console.error(err)
    });
  }

  toggleDropdown(project: any) {
    this.selectedProject = this.selectedProject === project ? null : project;
  }
}
