import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Emigrant } from '../models/emigrant';
import { EmigrantService } from '../service/emigrant.service';
import { EmigrantModalFormComponent } from '../emigrant-modal-form/emigrant-modal-form.component';
import { NavbarComponent } from 'app/navbar/navbar.component';


@Component({
  selector: 'app-emigrant-list',
  templateUrl: './emigrant-list.component.html',
  styleUrls: ['./emigrant-list.component.css'],
  providers: [NavbarComponent]
})
export class EmigrantListComponent implements OnInit {

  @Input() emigrant: Emigrant[];
  showTable: boolean = false;
  closeResult: string; 
  selectedValue: string;

  constructor(private emigrantService: EmigrantService, private modalService: NgbModal, private navbarService: NavbarComponent) { }
  
  ngOnInit(): void {
  }

  getApplications(){
    console.log("getting Applications from server...");
    this.emigrantService.getEmigrantsData(this.getValue()).subscribe(
      (res: any) => {
        console.log(res);
        this.emigrant = res;
        this.showTable = true;
     })
  }

  openModal(emigrant: Emigrant) {
    // Open modal form component
    const modalRef = this.modalService.open(EmigrantModalFormComponent);
    // pass into form component variable position
    modalRef.componentInstance.emigrant = emigrant;
    // handle result passing back from modal form component
    modalRef.result
      .then((result: any) => {
        if (result) {
          console.log('openModal', result);
        }
      })
      .catch(() => {
        // user click outside of the modal form
        console.log('Form: ', 'Cancel');
      });
  }

  refreshPage() {
    window.location.reload();
  }

  toggleShowTable(){
    this.showTable = !this.showTable;
  }

  getValue():String{
    //console.log("in get Value of Emigrant list component");
    this.selectedValue = this.emigrantService.selectedStatus;
    //console.log(this.selectedValue);
    return this.selectedValue;
  }

  approveEmigrant(emigrant : Emigrant){
    emigrant.status='Approved';
    console.log("Approved Emigrant :--",emigrant);

    this.emigrantService.saveUserProfile(emigrant).subscribe((response) => {
      console.log("Approved emigrant data sent to back end",response);
    });
  }

  rejectEmigrant(emigrant : Emigrant){
    emigrant.status='Rejected';
    console.log("Rejected Emigrant :--",emigrant);

    this.emigrantService.saveUserProfile(emigrant).subscribe((response) => {
      console.log("Rejected emigrant data sent to back end",response);
    });
    
  }
}
