import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-emigrant-login',
  templateUrl: './emigrant-login.component.html',
  styleUrls: ['./emigrant-login.component.css']
})
export class EmigrantLoginComponent implements OnInit {
  
  credentials = {
    "username": '',
    "password": ''
  }
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)){
      console.log("Ouput is submitted");
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any) => {
          console.log(response.token);
          this.loginService.loginUser(response.token);
          
          window.location.href="/emigrantDashboard";
          alert("Welcome Emigrant "+this.credentials.username);
        },
        error => {
          console.log("getting errorrr")
          console.log(error);
        }

      )
      //generate token
    }else{
      console.log("values are empty")
    }
  }
}
