// onboarding.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  getOnboardingData(): Observable<any> {
    return of({
      onboarding_id: "uuid-1",
      employee_id: "uuid-emp",
      start_date: "2024-10-01",
      status: "In Progress",
      tasks: [
        {
          task_id: "uuid-task-1",
          description: "Complete HR paperwork",
          due_date: "2024-10-05",
          status: "Completed"
        },
        {
          task_id: "uuid-task-2",
          description: "Attend orientation",
          due_date: "2024-10-10",
          status: "In Progress"
        }
      ],
      mentor: "uuid-mentor"
    });
  }
}
