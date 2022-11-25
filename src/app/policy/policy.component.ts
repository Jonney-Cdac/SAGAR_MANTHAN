import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Policy } from 'app/models/policy';
import { PolicyService } from 'app/service/policy.service';


@Component({
  selector: 'policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policies: Policy[];
  response: String[];
  selectedPolicy: Policy;
  header = new HttpHeaders();
  showTable: boolean = false;
  isSubmit: boolean = false;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
  }

  getPolicies(){
    console.log("Getting polices from server...");
    //this.header.set('Access-Control-Allow-Origin', '*');
    this.policyService.getPolicies()
    .pipe(
      map((res:any) => res.map(p => ({policyid: p.policyid, policyname: p.policyname, durationinyears: p.durationinyears, priceofpolicy: p.priceofpolicy})))
    ).subscribe(
      (res: any) => {
         console.log(res);
         this.policies = res;
      },
      (error)=> {console.log(error)},
    );
  }
  loadPolicies(){
    this.policies = [
      {policyid: 1,policyname: 'Policy-1',durationinyears: 10,priceofpolicy: 1000},
      {policyid: 2,policyname: 'Policy-2',durationinyears: 20,priceofpolicy: 2000},
      {policyid: 3,policyname: 'Policy-3',durationinyears: 30,priceofpolicy: 3000},
      {policyid: 4,policyname: 'Policy-4',durationinyears: 40,priceofpolicy: 4000},
      {policyid: 5,policyname: 'Policy-5',durationinyears: 50,priceofpolicy: 5000}
    ]
  }

  onSelectRadioButton(p:Policy){
    console.log("policy selected");
    console.log(p);
    this.selectedPolicy = p;
  }

  submitPolicy(){
    console.log("policy submitted");
    this.isSubmit = true;
    console.log("selected policies are: ")
    console.log(this.selectedPolicy);
    this.policyService.postPolicies(this.selectedPolicy).subscribe((res) => console.log(res), (error)=> console.log(error));
  }

  toggleShowTable(): void {
    this.showTable = !this.showTable;
}
}
