// onboarding.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private apiUrl = 'http://localhost:3000/formTitle';
  

  constructor(private http: HttpClient) {}

  submitOnboardingData(data: any): Observable<any> {
    const jsonData = this.prepareData(data); // Prepare data for submission
    return this.http.post(this.apiUrl, jsonData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateOnboardingData(id: string, data: any): Observable<any> {
    const jsonData = this.prepareData(data); // Prepare data for updating
    return this.http.put(`${this.apiUrl}/${id}`, jsonData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Helper method to convert FormData to JSON
  private prepareData(formValue: any) {
    // Convert nested objects if necessary
    const documents = formValue.documents;
    const onboardingTasks = formValue.onboardingTasks.map((task: any) => ({
      taskId: task.taskId,
      taskDescription: task.taskDescription,
      dueDate: task.dueDate,
      status: task.status
    }));

    return {
      jobTitle: formValue.jobTitle,
      department: formValue.department,
      manager: formValue.manager,
      startDate: formValue.startDate,
      onboardingTasks: onboardingTasks,
      documents: {
        resume: documents.resume,
        idDocuments: documents.idDocuments,
        certifications: documents.certifications,
        nda: documents.nda
      },
      training: formValue.training,
      systemAccess: formValue.systemAccess,
      emergencyContact: formValue.emergencyContact,
      acknowledgment: formValue.acknowledgment,
    };
  }
}
