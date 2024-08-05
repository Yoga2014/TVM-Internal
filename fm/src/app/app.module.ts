import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationalComponent } from './educational/educational.component';
import { GeneralComponent } from './general/general.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProfessionalComponent } from './professional/professional.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DetailsComponent } from './details/details.component';
import {AgGridModule } from 'ag-grid-angular';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';



@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    EducationalComponent,
    SkillsetComponent,
    ProfessionalComponent,
    HeaderComponent,
    DetailsComponent,
    PersonalDataFormComponent
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
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
