import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeamProject } from '../Interface/team-project';

@Injectable({
  providedIn: 'root'
})
export class TeamProjectService {
 
  api = 'http://localhost:3015/project'
  constructor(private apihttp: HttpClient) { }
  
  getMethod(): Observable<TeamProject[]> {
    return this.apihttp.get<TeamProject[]>(this.api + '/get')
  }

  postMethod(item: TeamProject): Observable<TeamProject> {
    return this.apihttp.post<TeamProject>(this.api + '/add', item)
  }

  deleteMethod(id: number): Observable<void> {
    return this.apihttp.delete<void>(this.api + '/' + id)
  }

  editMethod(id: any): Observable<TeamProject> {
    return this.apihttp.get<TeamProject>(this.api + '/' + id);
  }
  updateMethod(id: any, data: any) {
    return this.apihttp.put(this.api + '/' + id, data);
  }
} 
