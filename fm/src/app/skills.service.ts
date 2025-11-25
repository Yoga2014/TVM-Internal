import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Skill {
  id?: number; // Optional for new skills
  name: string;
  description: string;
  status: string;
  targetCompletionDate: string;
  startDate: string;
  category: string;
  weight: number;
  lastUpdate: string;
  successCriteria: string;
}


@Injectable({
  providedIn: 'root'
})
export class SkillsService {
    private apiUrl = 'http://localhost:3000/skills';
  
    constructor(private http: HttpClient) { }
  
    // Get all skills
    getSkills(): Observable<Skill[]> {
      return this.http.get<Skill[]>(this.apiUrl);
    }
  
    // Add a new skill
    addSkill(skill: Skill): Observable<Skill> {
      return this.http.post<Skill>(this.apiUrl, skill);
    }
  
    // Update an existing skill
    updateSkill(skill: Skill): Observable<Skill> {
      return this.http.put<Skill>(`${this.apiUrl}/${skill.id}`, skill);
    }
  
    // Delete a skill
    deleteSkill(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
