import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamProjectService } from './team-project.service';

@Component({
  selector: 'app-team-project',
  templateUrl: './team-project.component.html',
  styleUrls: ['./team-project.component.scss']
})
export class TeamProjectComponent {
  projectForm: FormGroup;
  projects: any[] = [];
  projectId: string | null = null;
  isEditMode = false;
  selectedItems: any;
  submittedData:any=[];  
  @ViewChild('offcanvasForm') offcanvasForm!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2 ,
    private teams:TeamProjectService
  ) {
    this.projectForm = this.fb.group({
      projectname: ['', [Validators.required]],
      clientname: ['', Validators.required],
      domain: ['', Validators.required],
      startDate: ['', Validators.required],
      voice: ['', Validators.required],
      voicestartDate: ['', Validators.required],
      voiceendDate: [''],
      coding: ['', Validators.required],
      codingstartDate: ['', Validators.required],
      codingendDate: [''],
      asset: this.fb.array([''])
    });
  }

 getMethod(){
  this.teams.getMethod().subscribe((res: any) => {
    this.submittedData=res
 })
}

  onSubmit() {
    if (this.projectForm.valid) {
     
      this.teams.postMethod(this.projectForm.value).subscribe(()=>{
        this.getMethod()
      })
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

  


}
