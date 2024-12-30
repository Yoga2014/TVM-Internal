import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetserviceService {
  private jsonUrl = 'http://localhost:4001/profile';
  constructor( private http: HttpClient) { }

  getProfileData(): Observable<any[]>{
    return this.http.get<any[]>(this.jsonUrl)
  }

}
