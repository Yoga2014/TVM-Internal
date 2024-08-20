import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamProjectService {

  api='http://localhost:3000/projectForm'

 
  
  
  
    constructor(private apihttp:HttpClient) { }
  
    
  
    
    getMethod(){
      return this.apihttp.get('http://localhost:3000/projectForm')
    }

  
  
  postMethod(item:any){
    return this.apihttp.post('http://localhost:3000/projectForm',item)
  }

  
  
  

}