import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Correct import here

@Component({
  selector: 'app-professional',

  templateUrl: './professional.component.html',
  standalone: false,
  styleUrl: './professional.component.scss'
})
export class ProfessionalComponent implements OnInit {

  professionalFrom!:FormGroup
  constructor(private pfbuilder:FormBuilder, private service:ServerService){

  }

  ngOnInit(): void {
    this.professionalFrom=this.pfbuilder.group({
      companyName:['',Validators.required],
      durationFrom:['',Validators.required],
      durationTo:['',Validators.required],
      empPreference:['',Validators.required],
      role:['',Validators.required],
      wExperience:['',Validators.required],
      achievements:['',Validators.required],
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
  get companyName() {
    return this.professionalFrom.get('companyName');
  }
  get durationFrom() {
    return this.professionalFrom.get('durationFrom');
  }
  get durationTo() {
    return this.professionalFrom.get('durationTo');
  }
  get empPreference() {
    return this.professionalFrom.get('empPreference');
  }
  get role() {
    return this.professionalFrom.get('role');
  }
  get wExperience() {
    return this.professionalFrom.get('wExperience');
  }
  get achievements() {
    return this.professionalFrom.get('achievements');
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
