import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { EmigrantDashboardComponent } from './emigrant-dashboard/emigrant-dashboard.component';
//import { EmigrantListComponent } from './emigrant-list/emigrant-list.component';
//import { EmigrantLoginComponent } from './emigrant-login/emigrant-login.component';
//import { EmigrantComponent } from './emigrant/emigrant.component';
//import { PolicyComponent } from './policy/policy.component';
//import { RecrutingAgentLoginComponent } from './recruting-agent-login/recruting-agent-login.component';
//import { RegistrationStatusComponent } from './registration-status/registration-status.component';
//import { StepperComponent } from './stepper/stepper.component';
//import { AuthGuard } from './utility/app.gaurd';
//import { AuthGuard } from './utility/auth.guard';

const routes: Routes = [
 
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: 'registrationFrom',
  //   component: EmigrantComponent
  // },
  // {
  //   path: 'getAllEmigrants',
  //   component: EmigrantListComponent
  // },
  // {
  //   path: 'registrationStatus',
  //   component: RegistrationStatusComponent
  // },
  // {
  //   path: 'policies',
  //   component: PolicyComponent
  // },
  
  // {
  //   path: 'emigrantLogin',
  //   component: EmigrantLoginComponent
  // },
  // {
  //   path: 'recrutingAgentLogin',
  //   component: RecrutingAgentLoginComponent
  // },
  // {
  //   path:'emigrantDashboard',
  //   component:EmigrantDashboardComponent,
  //   pathMatch:'full',
  //   canActivate: [AuthGuard]
  // },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
