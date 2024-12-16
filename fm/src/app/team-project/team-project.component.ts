import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamProjectService } from './team-project.service';
import { TeamProject } from '../Interface/team-project';



@Component({
  selector: 'app-team-project',
  templateUrl: './team-project.component.html',
  styleUrls: ['./team-project.component.scss']
})
export class TeamProjectComponent {
  projectForm: FormGroup = this.fb.group({
    projectName: ['', [Validators.required, Validators.minLength(3)]],
    clientName: ['', Validators.required],
    domain: ['', Validators.required],
    startDate: ['', Validators.required],
    voice: ['', [Validators.maxLength(100)]],
    voiceStartDate: [''],
    voiceEndDate: [''],
    coding: ['', [Validators.maxLength(100)]],
    codingStartDate: [''],
    codingEndDate: [''],
    asset: this.fb.array([]),
    projectStatus: ['', Validators.required],
  });
  @ViewChild('liveToast', { static: true }) liveToast!: ElementRef;
  @ViewChild('offcanvasForm', { static: true }) offcanvasForm!: ElementRef;
  projects: TeamProject[] = [];
  isEditMode: boolean = false;
  submittedData: TeamProject[] = [];
  editID: any;
  showToast: boolean = false; // This should be a boolean
  updatebtn: boolean = false;
  submit: boolean = false
  isOffcanvasOpen = false;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private teams: TeamProjectService
  ) { }

  ngOnInit() {
    this.getdata();
  }

  populateForm(data: any) {
    this.projectForm.patchValue({
      projectName: data.projectName,
      clientName: data.clientName,
      domain: data.domain,
      startDate: data.startDate,
      voice: data.voice,
      voiceStartDate: data.voiceStartDate,
      voiceEndDate: data.voiceEndDate,
      coding: data.coding,
      codingStartDate: data.codingStartDate,
      codingEndDate: data.codingEndDate,
      asset: data.asset,
      projectStatus: data.projectStatus
    });
  }

  getdata() {
    this.teams.getMethod().subscribe((response: any) => {
      this.submittedData = response;
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (!this.isEditMode) {
        const newId = this.submittedData.length > 0
          ? Math.max(...this.submittedData.map((project: any) => project.id)) + 1
          : 1;
        const newProject = {
          ...this.projectForm.value,
          id: newId
        };
        this.teams.postMethod(newProject).subscribe(
          (response: any) => {
            console.log(response, 'submitform')
            this.projects.push(response);
            this.getdata();
            this.resetForm();
          },
          (error: any) => {
            console.error('Error submitting project:', error);
          }
        );
      }
    }
  }

  onCheckboxChange(event: any) {
    const assets: FormArray = this.projectForm.get('asset') as FormArray;
    if (event.target.checked) {
      assets.push(new FormControl(event.target.value));
    } else {
      const index = assets.controls.findIndex((control) => control.value === event.target.value);
      if (index >= 0) {
        assets.removeAt(index);
      }
    }
  }

  edit(id: any) {
    // this.editID = id;
    // this.isEditMode = true;
    // this.updatebtn = false;
    // this.submit = true;
    this.teams.editMethod(id).subscribe((res: any) => {
      if (this.submittedData && this.submittedData.length > 0) {
        this.populateForm(this.submittedData[0]);
        this.isEditMode = true;
        this.editID = this.submittedData[0].id;
      }
      const assetsArray = this.projectForm.get('asset') as FormArray;
      assetsArray.clear();
      if (res.asset) {
        res.asset.forEach((asset: string) => {
          assetsArray.push(new FormControl(asset));
        });
      }
      // this.showToast = true;
    });
  }
  
  openToast() {
    this.showToast = true;
    this.isEditMode = false;
    this.projectForm.reset();
    this.updatebtn = true;
    this.submit = false;
  }

  update() {
    if (this.projectForm.valid && this.isEditMode) {
      this.teams.updateMethod(this.editID, this.projectForm.value).subscribe(() => {
        this.getdata();
        this.isEditMode = false;
        this.showToast = false;
      });

    }
  }

  delete(id: any, title: string, message: string) {
    this.teams.deleteMethod(id).subscribe(() => {
      this.getdata();
    });
  }

  resetForm() {
    this.projectForm.reset();
    const assetsArray = this.projectForm.get('ass') as FormArray;
    this.showToast = false;
    assetsArray.clear();
    this.isEditMode = false;
  }

  closeToast(){
    this.showToast = false; 
  }
}
