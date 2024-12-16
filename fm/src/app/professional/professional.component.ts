import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Correct import here

@Component({
  selector: 'app-professional',

  templateUrl: './professional.component.html',
  styleUrl: './professional.component.scss'
})
export class ProfessionalComponent implements OnInit {

  professionalFrom!:FormGroup
  constructor(private pfbuilder:FormBuilder, private service:ServerService){

  }

  ngOnInit(): void {
    this.professionalFrom=this.pfbuilder.group({
      companyname:['',Validators.required],
      durationfrom:['',Validators.required],
      durationto:['',Validators.required],
      empreference:['',Validators.required],
      role:['',Validators.required],
      tyoe:['',Validators.required],
      achivements:['',Validators.required],
      physical:['',Validators.required],
      arrest:['',Validators.required],
      employment:['',Validators.required],
      surgical:['',Validators.required],

    })
  }


  professionalPostClick(){
    const val= this.service.professionPosttMethod(this.professionalFrom.value).subscribe((res:any)=>{

   })
   console.log(val,'this is res value')
    console.log(this.professionalFrom.value,'total value')
      this.professionalFrom.reset()
  }
  get companyname() {
    return this.professionalFrom.get('companyname');
  }
  get durationfrom() {
    return this.professionalFrom.get('durationfrom');
  }
  get durationto() {
    return this.professionalFrom.get('durationto');
  }
  get empreference() {
    return this.professionalFrom.get('empreference');
  }
  get role() {
    return this.professionalFrom.get('role');
  }
  get tyoe() {
    return this.professionalFrom.get('tyoe');
  }
  get achivements() {
    return this.professionalFrom.get('achivements');
  }
  get physical() {
    return this.professionalFrom.get('physical');
  }
  get arrest() {
    return this.professionalFrom.get('arrest');
  }
  get employment() {
    return this.professionalFrom.get('employment');
  }
  get surgical() {
    return this.professionalFrom.get('surgical');
  }


}
