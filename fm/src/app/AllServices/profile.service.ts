import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class profile {
 api:any=''

public userSubject = new BehaviorSubject<any>('Initial User');

 sendDetails = this.userSubject.asObservable();



  constructor(private apihttp:HttpClient) { }

  detailsValue(arrayValue: any){
    this.userSubject.next(arrayValue)
  }

  getMethod(){

    return this.apihttp.get(this.api);
  }

  EducationalMethod(data:any){
    alert("data fetched")
    const api=' http://localhost:3000/Educational-detail'
    return this.apihttp.post(api,data)
  }

  SkillsMethod(data:any){
    const api='http://localhost:3000/Skills'
    return this.apihttp.post(api,data)
  }
  professionPosttMethod(data:any){
  const api='http://localhost:3000/ProfessionalData'
  return this.apihttp.post(api,data); 
  }
  basicPosttMethod(data:any){
  const api=' http://localhost:3000/profile'
  return this.apihttp.post(api,data);
  }

  ReferencePostMethod(data:any){
  const api='http://localhost:3000/ReferenceData'
  return this.apihttp.post(api,data);
  }

}
