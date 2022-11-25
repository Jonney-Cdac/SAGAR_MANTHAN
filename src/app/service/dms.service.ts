import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DmsService {

  constructor(private http:HttpClient) {
    this.http=http;
   }
  
   saveDataToDms(dmsData:FormData):Observable<any>{
    console.log("In DMS Service")
    for (var value of dmsData.values()){
      console.log(value);
    }
    console.log("calling dms service");
      return this.http.post("http://10.210.7.121:9191/dms/saveDocument", dmsData, {  responseType: 'text' });
   }

   getDmsData():Observable<any>{
    console.log("Downloading file from DMS");
    return this.http.get("http://10.210.7.121:9191/dms/downloadDocumentLatestByMappingIdDocType/e543cec0-da00-4469-b6ee-7cf34f851914/passport", {responseType: 'blob'})
   }
   
}
