import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.css']
})
export class PolicyFormComponent implements OnInit {

  policyForm:any =  FormGroup;
  public userFile:any = File;

  constructor(private fb: FormBuilder, private userService: UserService) { 

    this.policyForm = this.fb.group({
      policyId: new FormControl(''),
      policyName: new FormControl(''),
      durationInYears: new FormControl(''),
      priceOfPolicy: new FormControl('')
    })
  }

  ngOnInit(): void {
    
  }
  // onSelectFile(event){
  //   console.log("****On file select***" );
  //   const file = event.target.files[0];
  //   this.userFile = file;
  //   console.log(event.target.files[0]);
  // }

  onSubmit(){
    console.log(this.policyForm.value);
    this.policyForm.reset();
    const policyUser =  this.policyForm.value;
    var formData = new FormData();
    formData.append('policyUser', JSON.stringify(policyUser));
    //formData.append('userFile', this.userFile);
    this.userService.saveUserProfile(formData).subscribe((response)=> {
      console.log(response);
    });
  }

  onLoadDataClick():void {
    this.policyForm.patchValue({
      policyId: 'PO123',
      policyName: 'Policy1',
      durationInYears: '10',
      priceOfPolicy: '10000',
    });
  }
}
