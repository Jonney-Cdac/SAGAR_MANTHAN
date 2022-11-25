import { Passport } from "./passport";
import { Visa } from "./visa";

export class Emigrant{
   
        id: number;
        firstName: String;
        middleName: String;
        lastName: String;
        profession: String;
        education: String;
        address: String;
        contactNumber: String;
        gender: String;
        dateOfBirth:Date;
        mappingId: String;
        status: String;
        passport: Passport = new Passport();
        visa: Visa = new Visa();
     
       
}