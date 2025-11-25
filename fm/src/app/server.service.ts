import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
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
    const api='http://localhost:8080/api/education'
    return this.apihttp.post(api,data)
  }

  SkillsMethod(data:any){
    const api='http://localhost:8080/api/skill'
    return this.apihttp.post(api,data)
  }
postMethod(data:any){
  const api='http://localhost:3000/educationalFrom'
  return this.apihttp.post(api,data);
}

professionPosttMethod(data:any){
  const api='http://localhost:8080/api/professionaldata'
  return this.apihttp.post(api,data);
}

AccountPostMethod(data:any){
  const api='http://localhost:4005/account-details'
  return this.apihttp.post(api,data);
}

basicPostMethod(data: any) {
  const api = 'http://localhost:8080/api/profile/clob';
console.log(data,"datassssssssssssss")
  return this.apihttp.post(api, data);
}


logingetMethod(){
  const val=" http://localhost:3000/loginFrom"

  return this.apihttp.get(val)
}


loginPostMethod(data:any){
  const val=" http://localhost:3000/loginFrom"
  return this.apihttp.post(val,data)
}

logingettingMethod(id:any){
  const val="http://localhost:3000/loginFrom"
  const url = `${val}/${id}`

  return this.apihttp.get(url)
}

loginPutMethod(data:any,id:any){
  const val="http://localhost:3000/loginFrom"
  const url = `${val}/${id}`

  return this.apihttp.put(url,data)
}

loginDeleteMethod(id:any){
  const val="http://localhost:3000/loginFrom"
  const url = `${val}/${id}`
  return this.apihttp.delete(url)
}

detailsDeleteMethod(id:any){
  const val="http://localhost:3000/educationalFrom"
  const url = `${val}/${id}`
  return this.apihttp.delete(url)
}



}
