import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileData } from '../Interface/workers';
@Injectable({
  providedIn: 'root'
})
export class TestService {
private profileUrl="http://localhost:4001/profile"
  constructor(private http:HttpClient) {}

  getProfiles(): Observable<ProfileData> {
    return this.http.get<ProfileData>(this.profileUrl);
  }
}
