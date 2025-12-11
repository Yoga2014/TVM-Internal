import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamProjectService } from './team-project.service';

@Component({
  selector: 'app-team-project',
  templateUrl: './team-project.component.html',
  styleUrls: ['./team-project.component.scss']
})
export class TeamProjectComponent {

  projectForm: FormGroup = this.fb.group({
    projectHolder: ['', [Validators.required, Validators.minLength(3)]],
    projectVoice: ['', [Validators.required, Validators.maxLength(100)]],
    projectId: ['', Validators.required],
    vendor: ['', Validators.required],
    client: ['', [Validators.required, Validators.maxLength(100)]],
    parentCompany: ['', Validators.required],
    onboardedDate: ['', Validators.required],
    projectDomain: ['', Validators.required],
    projectStatus: ['', Validators.required],
    assets: this.fb.array([]) // Initialize FormArray
  });

  @ViewChild('offcanvasForm', { static: true }) offcanvasForm!: ElementRef;

  submittedData: any[] = [];
  isEditMode: boolean = false;
  showToast: boolean = false;
  editID: any;

  allAssets: string[] = ['laptop', 'charger', 'headset', 'mouse'];
  selectedItem: any = null;

  constructor(
    public fb: FormBuilder,
    private teams: TeamProjectService,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    this.getdata();
  }

    @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.selectedItem = null; // close dropdown if clicked outside
    }
  }

  get assetArray(): FormArray {
    return this.projectForm.get('assets') as FormArray;
  }

  getdata() {
    this.teams.getMethod().subscribe((res: any) => {
      this.submittedData = res;
    });
  }

  populateForm(data: any) {
    this.projectForm.patchValue({
      projectHolder: data.projectHolder,
      projectVoice: data.projectVoice,
      projectId: data.projectId,
      vendor: data.vendor,
      client: data.client,
      parentCompany: data.parentCompany,
      onboardedDate: data.onboardedDate,
      projectDomain: data.projectDomain,
      projectStatus: data.projectStatus
    });

    this.assetArray.clear();
    if (data.assets) {
      data.assets.forEach((asset: string) => this.assetArray.push(new FormControl(asset)));
    }
  }

  openToast() {
    this.showToast = true;
    this.isEditMode = false;
    this.projectForm.reset();
    this.assetArray.clear();
  }

  closeToast() {
    this.showToast = false;
    this.isEditMode = false;
    this.projectForm.reset();
    this.assetArray.clear();
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.assetArray.push(new FormControl(event.target.value));
    } else {
      const index = this.assetArray.controls.findIndex(c => c.value === event.target.value);
      this.assetArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.projectForm.valid && !this.isEditMode) {
      const newId = this.submittedData.length > 0
        ? Math.max(...this.submittedData.map(p => p.id)) + 1
        : 1;
      const body = { ...this.projectForm.value, id: newId };
      this.teams.postMethod(body).subscribe(() => {
        this.getdata();
        this.closeToast();
      });
    }
  }

  edit(id: any) {
    const project = this.submittedData.find(p => p.id === id);
    if (project) {
      this.populateForm(project);
      this.editID = id;
      this.isEditMode = true;
      this.showToast = true;
      this.selectedItem = false;

    }
  }

  update() {
    if (this.projectForm.valid && this.isEditMode) {
      this.teams.updateMethod(this.editID, this.projectForm.value).subscribe(() => {
        this.getdata();
        this.closeToast();
      });
    }
  }

  delete(id: any) {
    this.teams.deleteMethod(id).subscribe(() => {
      this.getdata();
    });
  }

  toggleDropdown(item: any) {
    this.selectedItem = this.selectedItem === item ? null : item;
  }
  
}
