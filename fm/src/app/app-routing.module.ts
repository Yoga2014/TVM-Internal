import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

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
import { OnLeaveComponent } from './onleave/onleave.component';
import { ApprovalLeaveRequestComponent } from './approval-leave-request/approval-leave-request.component';
import { TeamsDashboardComponent } from './teams-dashboard/teams-dashboard.component';
import { TeamsSpaceComponent } from './teams-space/teams-space.component';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';
import { GoalsComponent } from './goals/goals.component';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { CommentsComponent } from './comments/comments.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { HomeMyDataComponent } from './home-my-data/home-my-data.component';
import { OverviewComponent } from './overview/overview.component';
import { TeamReporteesComponent } from './team-reportees/team-reportees.component';
import { TeamDepartmentComponent } from './team-department/team-department.component';
import { TeamProjectComponent } from './team-project/team-project.component';
import { TeamListComponent } from './team-list/team-list.component';
import { OrganizationComponent } from './organization/organization.component';
import { PerformanceMyDataComponent } from './performance-my-data/performance-my-data.component';
import { GoalsMyDataComponent } from './goals-my-data/goals-my-data.component';
import { SkillsetPerformanceComponent } from './skillset-performance/skillset-performance.component';
import { CompetencyComponent } from './competency/competency.component';
import { PerformanceFeedbackComponent } from './performance-feedback/performance-feedback.component';
import { TaskTasksComponent } from './task-tasks/task-tasks.component';
import { TaskNavsComponent } from './task-navs/task-navs.component';
import { FormViewComponent } from './form-view/form-view.component';
import { TrackTaskComponent } from './track-task/track-task.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { OnboardingComponent } from './more-options/onboarding/onboarding.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { PoliciesComponent } from './policies/policies.component';
import { EmployeeTreeComponent } from './employee-tree/employee-tree.component';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';
import { DepartmentDirectoryComponent } from './department-directory/department-directory.component';
import { BirthdayCardComponent } from './birthday-card/birthday-card.component';
import { OperationComponent } from './operation/operation.component';
import { ReportsComponent } from './reports/reports.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { TimeTrackingMyDataComponent } from './time-tracking-my-data/time-tracking-my-data.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AppraisalFormComponent } from './appraisal-form/appraisal-form.component';
import { TotalEmployeeComponent } from './home-my-data/total-employee/total-employee.component';
import { ParticularEmpComponent } from './home-my-data/particular-emp/particular-emp.component';
import { LeaveapproveComponent } from './leave-approve/leave-approve/leave-approve.component';
import { AdminrequestComponent } from './leave-approve/admin-request/admin-request.component';
import { AdminsummaryComponent } from './leave-approve/admin-summary/admin-summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },

  // PROTECTED ROUTES
  { path: 'home', component: NewHomeComponent, canActivate: [AuthGuard] },
  { path: 'general', component: GeneralComponent, canActivate: [AuthGuard] },
  { path: 'educational', component: EducationalComponent, canActivate: [AuthGuard] },
  { path: 'skillset', component: SkillsetComponent, canActivate: [AuthGuard] },
  { path: 'professional', component: ProfessionalComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'newhires', component: NewHiresComponent, canActivate: [AuthGuard] },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'apply-leave', component: ApplyLeaveComponent, canActivate: [AuthGuard] },
  { path: 'leave-balance', component: LeaveBalanceComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'personalDataForm', component: PersonalDataFormComponent, canActivate: [AuthGuard] },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
  { path:'operation', component:OperationComponent, canActivate: [AuthGuard] },
  { path:'reports',component:ReportsComponent, canActivate: [AuthGuard] },
  {path:'leave-approve', component: LeaveapproveComponent,

         children:[
          {path:'admin-request',component:AdminrequestComponent},
          {path:'admin-summary',component:AdminsummaryComponent}
         ]
    },

  {
    path: 'leave-tracking',
    component: LeaveTrackingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mydata',
        component: MyDataComponent,
        children: [
          { path: 'leave-summary', component: LeaveSummaryComponent },
          { path: 'leave-balance', component: LeaveBalanceComponent },
          { path: 'leave-requests', component: LeaveRequestsComponent },
          { path: 'apply-leave', component: ApplyLeaveComponent },
        ],
      },
      {
        path: 'teams',
        component: TeamsComponent,
        children: [
          { path: 'leave-reportees', component: LeaveReporteesComponent },
          { path: 'on-leave', component: OnLeaveComponent },
          {
            path: 'approval-leave-request',
            component: ApprovalLeaveRequestComponent,
          },
          { path: 'apply-leave', component: ApplyLeaveComponent },
        ],
      },
    ],
  },

  {
    path: 'new-Home',
    component: NewHomeComponent,
    canActivate: [AuthGuard],
    children: [
       { path: '', redirectTo: 'my-space', pathMatch: 'full' },
      {
        path: 'my-space',
        component: HomeMyDataComponent,
        children: [
          { path: 'overview', component: OverviewComponent },
          { path: 'total-employee', component:TotalEmployeeComponent },
          { path: 'particular-emp', component: ParticularEmpComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'calendar', component: CalendarComponent },
        ],
      },

      {
        path: 'teams-dashboard',
        component: TeamsDashboardComponent,
        children: [
          { path: '', redirectTo: 'department', pathMatch: 'full' },
          { path: 'team-space', component: TeamsSpaceComponent },
          { path: 'team-reportees', component: TeamReporteesComponent },
          { path: 'department', component: TeamDepartmentComponent },
          { path: 'projects', component: TeamProjectComponent },
          { path: 'team-list', component: TeamListComponent },
        ],
      },

      {
        path: 'organization',
        component: OrganizationComponent,
        children:[
          { path:'announcements', component: AnnouncementsComponent },
          { path:'policies', component: PoliciesComponent },
          { path:'employee-tree', component: EmployeeTreeComponent },
          { path:'department-tree', component: DepartmentTreeComponent },
          { path:'department-directory', component: DepartmentDirectoryComponent },
          { path:'birthday-folks', component: BirthdayCardComponent },
          { path:'new-hires', component: NewHiresComponent },
        ]
      },
    ],
  },

  {
    path: 'task-tasks',
    component: TaskTasksComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: '',
        component: TaskNavsComponent,
        children: [
          { path: 'my-task', component: MyTaskComponent },
          { path: 'track-task', component: TrackTaskComponent },
          { path: 'form-view', component: FormViewComponent },
        ]
      }
    ]
  },

  {
    path: 'time-tracking',
    component: TimeTrackingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-data',
        component: TimeTrackingMyDataComponent,
        children: [
         { path: 'time-sheet', component: TimeSheetComponent },
         { path: 'appraisal', component: AppraisalFormComponent }
        ],
      },
    ]
  },

  {
    path: 'perfomance-myData',
    component: PerformanceMyDataComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GoalsMyDataComponent,
        children: [
          { path: 'goals', component: GoalsComponent },
          { path: 'competency', component: CompetencyComponent },
          { path: 'feedback', component: PerformanceFeedbackComponent },
        ],
      },
    ],
  },

  { path: 'goals/:goalId/comments', component: CommentsComponent, canActivate: [AuthGuard] },
  { path: 'add-goal/:id', component: AddGoalsComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
