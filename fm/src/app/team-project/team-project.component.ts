  import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
  import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { TeamProjectService } from './team-project.service';

  @Component({
    selector: 'app-team-project',
    templateUrl: './team-project.component.html',
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
      asset: this.fb.array([])
    });

    projects: any[] = [];
    projectId: string | null = null;
    isEditMode = false;
    submittedData: any[] = [];
    editID: any;

    constructor(
      public fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private renderer: Renderer2,
      private teams: TeamProjectService
    ) {}

    ngOnInit() {
      this.getdata();
    
      // Load the first project data into the form if available (for demonstration)
      this.teams.getMethod().subscribe((response: any) => {
        this.submittedData = response;
        if (this.submittedData && this.submittedData.length > 0) {
          // Pre-fill the form with the first project data
          this.populateForm(this.submittedData[0]);
          this.isEditMode = true; // Optional: set edit mode
          this.editID = this.submittedData[0].id; // Store the ID if needed for updating
        }
      }, (error: any) => {
        console.error('Error fetching data:', error);
      });
    }
    populateForm(data: any) {
      this.projectForm.patchValue({
        projectname: data.projectname,
        clientname: data.clientname,
        domain: data.domain,
        startDate: data.startDate,
        voice: data.voice,
        voicestartDate: data.voicestartDate,
        voiceendDate: data.voiceendDate,
        coding: data.coding,
        codingstartDate: data.codingstartDate,
        codingendDate: data.codingendDate
      });
      
      
    }
    
    getdata() {
      this.teams.getMethod().subscribe((response: any) => {
      
        this.submittedData = response;
      })
    }
    


    onSubmit() {
      if (this.projectForm.valid && !this.isEditMode) {
        this.teams.postMethod(this.projectForm.value).subscribe(() => {
          this.getdata();
          this.resetForm();
        });
      }
    }

    onCheckboxChange(e: any) {
      const assets: FormArray = this.projectForm.get('asset') as FormArray;
      if (e.target.checked) {
        assets.push(new FormControl(e.target.value));
      } else {
        const index = assets.controls.findIndex(x => x.value === e.target.value);
        assets.removeAt(index);
      }
    }

    edit(id: any) {
      this.editID = id;
      this.isEditMode = true;

      this.teams.editMethod(id).subscribe((res: any) => {
        this.projectForm.patchValue({
          projectname: res.projectname,
          clientname: res.clientname,
          domain: res.domain,
          startDate: res.startDate,
          voice: res.voice,
          voicestartDate: res.voicestartDate,
          voiceendDate: res.voiceendDate,
          coding: res.coding,
          codingstartDate: res.codingstartDate,
          codingendDate: res.codingendDate
        });

        const assetsArray = this.projectForm.get('asset') as FormArray;
        assetsArray.clear();
        if (res.asset) {
          res.asset.forEach((asset: string) => {
            assetsArray.push(new FormControl(asset));
          });
        }

        const offcanvas = document.getElementById('offcanvasForm');
        if (offcanvas) {
          offcanvas.classList.add('show');
        }
      });
    }

    update() {
      if (this.projectForm.valid && this.isEditMode) {
        this.teams.updateMethod(this.editID, this.projectForm.value).subscribe(() => {
          this.getdata();
          this.isEditMode = false;
          this.resetForm();

          const offcanvas = document.getElementById('offcanvasForm');
          if (offcanvas) {
            offcanvas.classList.remove('show');
          }
        });
      }
    }

    delete(id: any) {
      this.teams.deleteMethod(id).subscribe(() => {
        this.getdata();
      });
    }

    resetForm() {
      this.projectForm.reset();
      const assetsArray = this.projectForm.get('asset') as FormArray;
      assetsArray.clear();
      this.isEditMode = false;
    }
  }
