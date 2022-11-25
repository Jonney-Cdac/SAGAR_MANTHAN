import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emigrant } from '../models/emigrant';

@Injectable({
  providedIn: 'root'
})
export class EmigrantService {

  selectedStatus: string;
  constructor(public http: HttpClient) {
    this.http = http;
   }

   saveUserProfile(emigrant: any):Observable<any>{
    console.log("In Emigrant Service")
   
    console.log("calling emigrant service");
      return this.http.post("http://10.210.8.153:9393/emigrant/saveEmigrant", emigrant, {  responseType: 'text' });
   }

   getEmigrantsData(value:String){
    return this.http.get(`http://10.210.8.153:9393/emigrant/getEmigrantList?status=${value}`);
   }
}
