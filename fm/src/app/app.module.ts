import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

// Components
import { EducationalComponent } from './educational/educational.component';
import { GeneralComponent } from './general/general.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProfessionalComponent } from './professional/professional.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';



import { DashboardComponent } from './dashboard/dashboard.component';
import { BirthdayCardComponent } from './birthday-card/birthday-card.component';
import { NewHiresComponent } from './new-hires-card/new-hires-card.component';
import { EmployeeDetailsComponent } from './new-hires-card/employee-details/employee-details.component';
import { EditEmployeeComponent } from './new-hires-card/edit-employee/edit-employee.component';
import { LeaveSummaryComponent } from './leave-summary/leave-summary.component';
import { ApplyLeaveComponent } from './leave-summary/apply-leave/apply-leave.component';
import { TeamsComponent } from './teams/teams.component';
import { LeaveReporteesComponent } from './leave-reportees/leave-reportees.component';
import { OnLeavesComponent } from './onleave/onleave.component';
import { LeaveTrackingComponent } from './leave-tracking/leave-tracking.component';
import { MyDataComponent } from './my-data/my-data.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { LeaveRequestsComponent } from './leave-request/leave-request.component';
import { LeaveReportDashboardComponent } from './leave-report-dashboard/leave-report-dashboard.component';
import { ApprovalLeaveRequestComponent } from './approval-leave-request/approval-leave-request.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { INITIAL_EVENTS } from './calendar/event-utils';
import { LogOutComponent } from "./log-out/log-out.component";

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    EducationalComponent,
    SkillsetComponent,
    ProfessionalComponent,
    HeaderComponent,
    DetailsComponent,
    PersonalDataFormComponent,
    DashboardComponent,
    BirthdayCardComponent,
    NewHiresComponent,
    EmployeeDetailsComponent,
    EditEmployeeComponent,
    LeaveSummaryComponent,
    ApplyLeaveComponent,
    TeamsComponent,
    LeaveReporteesComponent,
    OnLeavesComponent,
    LeaveTrackingComponent,
    MyDataComponent,
    LeaveBalanceComponent,
    LeaveRequestsComponent,
    LeaveReportDashboardComponent,
    ApprovalLeaveRequestComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    AgGridModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatToolbarModule,
    CalendarModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    FullCalendarModule,
    INITIAL_EVENTS,
    LogOutComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
