import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { EducationalComponent } from './educational/educational.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProfessionalComponent } from './professional/professional.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { GoalsComponent } from './goals/goals.component';
import { AddgoalsComponent } from './addgoals/addgoals.component';
// import { HeaderComponent } from 'ag-grid-community/dist/types/core/components/framework/componentTypes';

const routes: Routes = [
  { path: 'general', component: GeneralComponent, data: { animation: 'GeneralPage' } },
  { path: 'educational', component: EducationalComponent, data: { animation: 'EducationalPage' } },
  { path: 'skillset', component: SkillsetComponent, data: { animation: 'SkillsetPage' } },
  { path: 'professional', component: ProfessionalComponent, data: { animation: 'ProfessionalPage' } },
  { path: 'details', component: DetailsComponent, data: { animation: 'detailsPage' } },
  {path: 'header', component:HeaderComponent},
  {path:"goals",component:GoalsComponent},
  { path: 'addgoal', component: AddgoalsComponent }

  // { path: '', redirectTo: '/general', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
