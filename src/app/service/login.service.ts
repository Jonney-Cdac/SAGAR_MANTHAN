import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  constructor(private http:HttpClient) { }

  generateToken(credentials:any){
    //token generate
     return this.http.post ("http://localhost:8081/authenticate",credentials )

  }

  //login service
  loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token ==undefined || token =='' || token ==null){
      return false;
    }else{
      return true
    }
  }

  logout(){
    localStorage.removeItem('token');
    return true;
  }

  //for getting token
  getoken(){
    localStorage.getItem('token');
  }
}
