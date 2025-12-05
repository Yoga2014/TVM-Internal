import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamProjectService } from './team-project.service';
import { TeamProject } from '../Interface/team-project';



  @Component({
    selector: 'app-team-project',
    templateUrl: './team-project.component.html',
    standalone: false,
    styleUrls: ['./team-project.component.scss']
  })
  export class TeamProjectComponent{
    projectForm: FormGroup = this.fb.group({
      projectname: ['', [Validators.required, Validators.minLength(3)]],
      clientname: ['', Validators.required],
      domain: ['', Validators.required],
      startDate: ['', Validators.required],
      voice: ['', [Validators.required, Validators.maxLength(100)]],
      voicestartDate: ['', Validators.required],
      voiceendDate: [''],
      coding: ['', [Validators.required, Validators.maxLength(100)]],
      codingstartDate: ['', Validators.required],
      codingendDate: [''],
      asset: this.fb.array([]),
      projectStatus: ['', Validators.required] 
    });
    @ViewChild('liveToast', { static: true }) liveToast!: ElementRef;
    @ViewChild('offcanvasForm', { static: true }) offcanvasForm!: ElementRef;
    toastTitle = '';
    toastMessage = '';
    projects: any[] = [];
    projectId: string | null = null;
    isEditMode = false;
    submittedData: any[] = [];
    editID: any;
    showToast: boolean = false; // This should be a boolean
    updatebtn:boolean=false;
    submit:boolean=false
    toastTime: string = 'Just now';
    isOffcanvasOpen = false;
  
    constructor(
      public fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private renderer: Renderer2,
      private teams: TeamProjectService
    ) {}

  ngOnInit() {
    this.getdata();
  }

  populateForm(data: any) {
    this.projectForm.patchValue({
      projectname: data.projectname,
      clientname: data.clientname,
      domain: data.domain,
      startDate: data.startDate,
      voice: data.voice,
      voicestartDate: data.voicestartDate,
      voiceEndDate: data.voiceEndDate,
      coding: data.coding,
      codingstartDate: data.codingstartDate,
      codingendDate: data.codingendDate,
      projectStatus: data.projectStatus
    });

const assetsArray = this.projectForm.get('asset') as FormArray;
assetsArray.clear();
if (data.asset) {
  data.asset
    .filter((a: string | null) => a != null) // specify type
    .forEach((asset: string) => assetsArray.push(new FormControl(asset)));
}

  }

  allAssets: string[] = ['laptop', 'charger', 'headset', 'mouse'];

// Getter for asset FormArray
get assetArray(): FormArray {
  return this.projectForm.get('asset') as FormArray;
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
  const assets: FormArray = this.assetArray;
  if (event.target.checked) {
    assets.push(new FormControl(event.target.value));
  } else {
    const index = assets.controls.findIndex(control => control.value === event.target.value);
    if (index >= 0) {
      assets.removeAt(index);
    }
  }
}


edit(id: any) {
  const project = this.submittedData.find(p => p.id === id);
  if (project) {
    this.populateForm(project);
    this.isEditMode = true;
    this.editID = project.id;
    this.showToast = true; // open offcanvas
  }
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
    const assetsArray = this.projectForm.get('asset') as FormArray;
    assetsArray.clear();
    this.showToast = false;
    this.isEditMode = false;
  }

  closeToast(){
    this.showToast = false; 
  }
}
