import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { CompiledObject } from 'app/models/compiledObject';
import { EmigrantService } from 'app/service/emigrant.service';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  firstObject:any;
  secondObject:any;
  newObject : any;
  newObject1:any;
  newObject2:any;
  newObject3:any;
  newObject4:any;
  localStorageObject:any;
  dms = {
    mappingId: '',
    processName: 'Registration process',
    docType: 'passport',
    uploadedBy: 'neil',
  };
  public userFile: any = File;
  constructor(private _formBuilder: FormBuilder,private emigrantService: EmigrantService) { 
  }
  
  ngOnInit(): void {
  }
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    profession: ['', Validators.required],
    education: ['', Validators.required],
    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    contactNumber: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    passportNumber: ['', Validators.required],
    passportType: ['', Validators.required],
    placeOfIssue: ['', Validators.required],
    issueDate: ['', Validators.required],
    expiryDate: ['', Validators.required],


  });
  fourthFormGroup= this._formBuilder.group({
    visaNumber: ['', Validators.required],
    visaType: ['', Validators.required],
    visaPlaceOfIssue: ['', Validators.required],
    visaIssueDate: ['', Validators.required],
    visaExpiryDate: ['', Validators.required],
  });
  isLinear = false;
  isEditable = false;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date(2010, 0, 1);


  onNext(){
    this.newObject1 = {...this.newObject,...this.firstFormGroup};
    localStorage.setItem('newObject1', JSON.stringify(this.newObject1.value));
  }
  onNext1(){
    this.localStorageObject = localStorage.getItem('newObject1');
    const localObject = JSON.parse(this.localStorageObject);
    this.newObject2 = {...localObject,...this.secondFormGroup.value};
    console.log("***********Final Object2");
    console.log(this.newObject2);
    localStorage.setItem('newObject2', JSON.stringify(this.newObject2));
  }
  onNext2(){
    this.localStorageObject = localStorage.getItem('newObject2');
    const localObject2 = JSON.parse(this.localStorageObject);
    this.newObject3 = {...localObject2,passport:this.thirdFormGroup.value};
    console.log("***********Final Object3");
    console.log(this.newObject3);
    localStorage.setItem('newObject3', JSON.stringify(this.newObject3));
  }
  onNext3(){
    this.localStorageObject = localStorage.getItem('newObject3');
    const localObject3 = JSON.parse(this.localStorageObject);
    this.newObject4 = {...localObject3,visa:this.fourthFormGroup.value};
    console.log("***********Final Object");
    console.log(this.newObject4);
    localStorage.setItem('newObject4', JSON.stringify(this.newObject4));
  }

  onSubmit() {
    console.log('Emigrant form submitted');
    var newMappingId;
    var formData = new FormData();
    formData.append('emigrant', JSON.stringify(this.newObject4));
    //formData.append('file', this.userFile);

    var dmsFromData = new FormData();
    dmsFromData.append('dmsData', JSON.stringify(this.dms));
    dmsFromData.append('file', this.userFile);

    // this.dmsService.saveDataToDms(dmsFromData).subscribe(
    //   (response) => {
    //     console.log("Response received from DMS: ");
    //     console.log(response);
    //     if(response != null){

    //       alert("form submitted to Backend");
    //        newMappingId = this.emigrantFrom.mappingId = response;
    //       //console.log("*****************************"+newMappingId)
    //       this.emigrant.mappingId = newMappingId;
    //       console.log(this.emigrant);
          
    //       console.log("New Mapping id is: ")
    //       console.log(newMappingId);
    //       // for (var val of formData.keys()){
    //       //   console.log("form values --"+val);

    //       // }
    //       // for (var value of formData.values()){
    //       //   console.log("form values --"+value);
    //       // }
         
          
    //       this.flag = true;
          
    //     }
    //     else{
    //       console.log("response is null!!");
    //       console.log("Not calling emigrant service!!");
    //     }
    //   },
    //   (error) => console.log(error)
    // );

    //if (this.flag === true) {
      console.log('true returned from DMS service');
      console.log('forwarding data to Backend...');

      this.emigrantService.saveUserProfile(this.newObject4).subscribe((response) => {
        console.log(response);
      });
    //}

    //this.emigrantFrom.reset();
  }
}
