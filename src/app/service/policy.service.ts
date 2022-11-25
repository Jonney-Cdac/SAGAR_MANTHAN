import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) {
    this.http = http;
   }

   getPolicies(): Observable<any>{
      return this.http.get<Policy[]>("http://10.210.7.121:9191/policy/getallpolicy");
   }

   postPolicies(policy:Policy):Observable<any>{
    console.log("In policy service");
    return this.http.post("http://10.210.7.121:9191/policy/policybuy",policy);
 }
}

