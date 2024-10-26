import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamProjectService {
 
  private api='http://localhost:3005/project'
  constructor(private apihttp:HttpClient) { }
  
  getMethod(){
      return this.apihttp.get(this.api)
    }

  
  
  postMethod(item:any){
    return this.apihttp.post(this.api,item)
  }

  
  deleteMethod(id:any){
    return this.apihttp.delete(this.api +'/'+id)
  }


    editMethod(id:any){
      return this.apihttp.get(this.api +'/'+id);
      }
    updateMethod(id:any,data:any){
         return this.apihttp.put(this.api +'/'+id,data);
       }
  }
