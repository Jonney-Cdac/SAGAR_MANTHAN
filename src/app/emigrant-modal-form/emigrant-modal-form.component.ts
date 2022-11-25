import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Emigrant } from 'app/models/emigrant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-emigrant-modal-form',
  templateUrl: './emigrant-modal-form.component.html',
  styleUrls: ['./emigrant-modal-form.component.css'],
  providers: [DatePipe]
})
export class EmigrantModalFormComponent implements OnInit {
  @Input() public emigrant: Emigrant;
  entryForm: FormGroup;
  result: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.createForm();
    console.log('ngOnInit emigran:', this.emigrant);
    if (this.emigrant != undefined) {
      console.log('Emigrant value :------', this.emigrant);
      this.entryForm.setValue({
        id: this.emigrant.id,
        firstName: this.emigrant.firstName,
        middleName: this.emigrant.middleName,
        lastName: this.emigrant.lastName,
        profession: this.emigrant.profession,
        education: this.emigrant.education,
        address: this.emigrant.address,
        contactNumber: this.emigrant.contactNumber,
        gender: this.emigrant.gender,
        dateOfBirth: this.emigrant.dateOfBirth,
        mappingId: this.emigrant.mappingId,
        status: this.emigrant.status,
        passport: {
          passportNumber: this.emigrant.passport.passportNumber,
          passportType: this.emigrant.passport.passportType,
          placeOfIssue: this.emigrant.passport.placeOfIssue,
          issueDate: this.emigrant.passport.issueDate,
          expiryDate: this.emigrant.passport.expiryDate,
        },
        visa: {
          visaNumber: this.emigrant.visa.visaNumber,
          visaType: this.emigrant.visa.visaType,
          visaIssueDate: this.emigrant.visa.visaIssueDate,
          visaExpiryDate: this.emigrant.visa.visaExpiryDate,
        },
      });
    }
  }

  // Handle Delete button click
  onCancel() {
    this.result = { emigran: this.emigrant, status: true };
    this.activeModal.close(this.result);
  }

  // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      profession: [''],
      education: [''],
      address: [''],
      contactNumber: [''],
      gender: [''],
      dateOfBirth: [''],
      mappingId: [''],
      status: [''],
      passport: this.formBuilder.group({
      passportNumber: [''],
      passportType: [''],
      placeOfIssue: [''],
      issueDate: [''],
      expiryDate: ['']
      }),
      visa: this.formBuilder.group({
      visaNumber: [''],
      visaType: [''],
      visaIssueDate: [''],
      visaExpiryDate: ['']
      })
    });
  }
}
