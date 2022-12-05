import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreHeaderComponent } from './pre-header/pre-header.component';
import { FooterComponent } from './footer/footer.component';
import { MarqueComponent } from './marque/marque.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MmdacHomeBodyComponent } from './mmdac-home-body/mmdac-home-body.component';
import { SidebarComponent } from './home-body/sidebar/sidebar.component';
import { MapComponent } from './home-body/map/map.component';
import { NewNavbarComponent } from './new-navbar/new-navbar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
//import { EmigrantComponent } from './emigrant/emigrant.component';
//import { POEComponent } from './poe/poe.component';
//import { NavbarComponent } from './navbar/navbar.component';
//import { EmigrantListComponent } from './emigrant-list/emigrant-list.component';
//import { RegistrationStatusComponent } from './registration-status/registration-status.component';
//import { EmigrantLoginComponent } from './emigrant-login/emigrant-login.component';
//import { RecrutingAgentLoginComponent } from './recruting-agent-login/recruting-agent-login.component';
//import { UserService } from './service/user.service';
//import { LoginService } from './service/login.service';
//import { EmigrantDashboardComponent } from './emigrant-dashboard/emigrant-dashboard.component';
//import { EmigrantService } from './service/emigrant.service';
//import { PolicyComponent } from './policy/policy.component';
//import { initializeKeycloak } from './utility/app.init';
//import { EmigrantModalFormComponent } from './emigrant-modal-form/emigrant-modal-form.component';
//import { CarousalComponent } from './carousal/carousal.component';
//import { HomeCarousalComponent } from './home-body/home-carousal/home-carousal.component';
//import { StepperComponent } from './stepper/stepper.component';
//import { ExpansionPanelComponent } from './home-body/expansion-panel/expansion-panel.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  //  EmigrantComponent,
  //  POEComponent,
  //  NavbarComponent,
    HeaderComponent,
  //  EmigrantListComponent,
  //  RegistrationStatusComponent,
  //  EmigrantLoginComponent,
  //  RecrutingAgentLoginComponent,
  //  EmigrantDashboardComponent,
  //  PolicyComponent,
  //  EmigrantModalFormComponent,
    PreHeaderComponent,
    // CarousalComponent,
    FooterComponent,
    MarqueComponent,
    HomeBodyComponent,
  //  HomeCarousalComponent,
  //  ExpansionPanelComponent,
    // StepperComponent,
    MmdacHomeBodyComponent,
    SidebarComponent,
    MapComponent,
    NewNavbarComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    NgbModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,

   
  ],
  providers: [
    // LoginService,
    // UserService,
    // EmigrantService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   deps:[KeycloakService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
