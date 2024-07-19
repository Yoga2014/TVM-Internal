import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-details',

  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  loginForm!: FormGroup;
  fromArray: any[] = [];
  isEditing = false;
  editId: any = null;
  educationDetails: any;

  constructor(private formbild:FormBuilder, private serv:ServerService){
    this.loginForm = this.formbild.group({
      name: [''],
      pass: ['']
    });
  }

  ngOnInit(): void {
    this.serv.getMethod().subscribe((res)=>{
      this.educationDetails=res;
    })

    this.serv.sendDetails.subscribe((res)=>{
      this.educationDetails =res;
    })
    // console.log(this.educationDetails,'this is details value')
    console.log(this.educationDetails,'this is res value')
  }

  getData() {
    this.serv.logingetMethod().subscribe((res: any) => {
      this.fromArray = res;
      // console.log(res.value, 'res value');
    });
  }

  // deleteRow(id: any) {
  //   this.serv.detailsDeleteMethod(id).subscribe((res: any) => {
  //     // this.getData();
  //   });
  // }

  saveClick() {
    this.serv.loginPostMethod(this.loginForm.value).subscribe((res: any) => {
      this.getData();
      console.log(res);
    });
    this.loginForm.reset();
  }

  deleteClick(id: any) {
    this.serv.loginDeleteMethod(id).subscribe((res: any) => {
      this.getData();
    });
  }

  editClick(id: any) {
    this.editId = id;
    this.isEditing = true;
    this.serv.logingettingMethod(id).subscribe((res: any) => {
      this.loginForm.patchValue(res);
      this.getData();
    });
  }

  updateClick() {
    this.serv.loginPutMethod(this.loginForm.value, this.editId).subscribe((res: any) => {
      this.getData();
      this.isEditing = false;
      this.loginForm.reset();
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateClick();
    } else {
      this.saveClick();
    }
  }



  // people = [
  //   { fullName: 'Remesh', professionalRelationship: 'Project Manager', contactNo: '7985486439', business: 'Software', isEdit: false },
  //   { fullName: 'Akila', professionalRelationship: 'Team Member', contactNo: '8985486439', business: 'Software', isEdit: false }
  // ];


  // addClick(){
  //   alert('Extra row Added')
  //   this.people.push({fullName:'Pravin',professionalRelationship:'Team leader',contactNo:'9876543210',business:'Software',isEdit:false})
  // }


  toggleEditMode(index: number) {
    this.educationDetails[index].isEdit = !this.educationDetails[index].isEdit;
  }

  saveChanges(index: number) {
    this.educationDetails[index].isEdit = false;
  }


  deleteRow(index: number): void {
    this.educationDetails.splice(index, 1);
  }


}
