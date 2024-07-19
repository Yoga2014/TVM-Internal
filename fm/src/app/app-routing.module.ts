import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { EducationalComponent } from './educational/educational.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ProfessionalComponent } from './professional/professional.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'general', component: GeneralComponent, data: { animation: 'GeneralPage' } },
  { path: 'educational', component: EducationalComponent, data: { animation: 'EducationalPage' } },
  { path: 'skillset', component: SkillsetComponent, data: { animation: 'SkillsetPage' } },
  { path: 'professional', component: ProfessionalComponent, data: { animation: 'ProfessionalPage' } },
  { path: 'details', component: DetailsComponent, data: { animation: 'detailsPage' } },

  // { path: '', redirectTo: '/general', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
