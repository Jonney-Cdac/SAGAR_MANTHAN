import { Component, OnInit } from '@angular/core';
import { EmigrantService } from 'app/service/emigrant.service';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn = false;
  public selectedStatus: string;

  constructor(private loginService: LoginService,private  keycloak: KeycloakService, private emigrantService: EmigrantService) { }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
  }

  logoutUser(){
    // this.loginService.logout();
    // location.reload();
    this.keycloak.logout();
  }

  passValue(value : string){
    console.log(value);
   this.emigrantService.selectedStatus = value;
  }
}
