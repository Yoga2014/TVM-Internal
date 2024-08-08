import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { EducationalComponent } from './educational/educational.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProfessionalComponent } from './professional/professional.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewHiresComponent } from './new-hires-card/new-hires-card.component';
import { EmployeeDetailsComponent } from './new-hires-card/employee-details/employee-details.component';
import { EditEmployeeComponent } from './new-hires-card/edit-employee/edit-employee.component';
import { LeaveSummaryComponent } from './leave-summary/leave-summary.component';
import { ApplyLeaveComponent } from './leave-summary/apply-leave/apply-leave.component';
import { TeamsComponent } from './teams/teams.component';
import { LeaveReporteesComponent } from './leave-reportees/leave-reportees.component';
import { LeaveRequestsComponent } from './leave-request/leave-request.component';
import { LeaveTrackingComponent } from './leave-tracking/leave-tracking.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { MyDataComponent } from './my-data/my-data.component';
import { OnLeavesComponent } from './onleave/onleave.component';
import { ApprovalLeaveRequestComponent } from './approval-leave-request/approval-leave-request.component';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';

const routes: Routes = [
  { path: 'general', component: GeneralComponent },
  { path: 'educational', component: EducationalComponent },
  { path: 'skillset', component: SkillsetComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newhires', component: NewHiresComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'apply-leave', component: ApplyLeaveComponent },
  { path: 'leave-balance', component: LeaveBalanceComponent },
  { path: 'teams', component: TeamsComponent },
  {path:"personalDataForm",component:PersonalDataFormComponent},
  {
    path: 'leave-tracking',
    component: LeaveTrackingComponent,
    children: [
      {
        path: 'mydata',
        component: MyDataComponent,
        children: [
          { path: 'leave-summary', component: LeaveSummaryComponent },
          { path: 'leave-balance', component: LeaveBalanceComponent },
          { path: 'leave-requests', component: LeaveRequestsComponent },
          { path: 'apply-leave', component: ApplyLeaveComponent }
        ]
      },
      {
        path: 'teams',
        component: TeamsComponent,
        children: [
          { path: 'leave-reportees', component: LeaveReporteesComponent },
          { path: 'on-leave', component: OnLeavesComponent },
          { path: 'approval-leave-request', component: ApprovalLeaveRequestComponent },
          { path: 'apply-leave', component: ApplyLeaveComponent }
        ]
      }
    ]
  },
  // Default redirect to 'general' if no path is matched
  { path: '', redirectTo: '/general', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
