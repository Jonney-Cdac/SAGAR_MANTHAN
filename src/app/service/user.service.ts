import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
    this.http = http;
   }

   saveUserProfile(formData: FormData):Observable<any>{
    console.log("In user Service")
    
      return this.http.post("http://10.210.7.121:9191/policy/getPolicies", formData);
   }
}
