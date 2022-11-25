import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Emigrant } from '../models/emigrant';
import { DmsService } from '../service/dms.service';
import { EmigrantService } from '../service/emigrant.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-emigrant',
  templateUrl: './emigrant.component.html',
  styleUrls: ['./emigrant.component.css'],
})
export class EmigrantComponent implements OnInit {
  emigrantFrom: any = FormGroup;
  public userFile: any = File;
  flag: boolean = true;
  emigrant: Emigrant = new Emigrant();

  dms = {
    mappingId: '',
    processName: 'Registration process',
    docType: 'passport',
    uploadedBy: 'neil',
  };

  constructor(
    private fb: FormBuilder,
    private emigrantService: EmigrantService,
    private dmsService: DmsService
  ) {
    
  }

  getDmsData(){
    console.log("in DMS get data");
    this.dmsService.getDmsData().subscribe(blob => saveAs(blob, "example.pdf"));
  }
  ngOnInit(): void {}
}
