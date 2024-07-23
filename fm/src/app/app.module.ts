import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationalComponent } from './educational/educational.component';
import { GeneralComponent } from './general/general.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProfessionalComponent } from './professional/professional.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DetailsComponent } from './details/details.component';
import {AgGridModule } from 'ag-grid-angular'
import { GoalsComponent } from './goals/goals.component';
import { AddgoalsComponent } from './addgoals/addgoals.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    EducationalComponent,
    SkillsetComponent,
    ProfessionalComponent,
    HeaderComponent,
    DetailsComponent,
    GoalsComponent,
    AddgoalsComponent
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
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule


  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
