import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamProjectService {

  private api = 'http://192.168.0.11:8080/api/projects'
  constructor(private apihttp: HttpClient) { }

  getMethod() {
    return this.apihttp.get(this.api+"/get")
  }



  postMethod(item: any) {
    return this.apihttp.post(this.api+"/add", item)
  }


  deleteMethod(id: any) {
    return this.apihttp.delete(this.api + '/' + id)
  }


  editMethod(id: any) {
    return this.apihttp.get(this.api + '/' + id);
  }
  updateMethod(id: any, data: any) {
    return this.apihttp.put(this.api + '/' + id, data);
  }
}
