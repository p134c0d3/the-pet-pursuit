import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../services/HTTPService';
import { adoptionApplication } from '../models/adoption-application.model';



@Component({
  selector: 'app-adoption-application-list',
  templateUrl: './adoption-application-list.component.html',
  styleUrls: ['./adoption-application-list.component.scss'],
})
export class AdoptionApplicationListComponent implements OnInit {
  appArray: adoptionApplication[] = [];
  constructor(private httpService: HTTPService) {}
  openApplicationModal = false;
  selectedApplication: adoptionApplication = null;


  ngOnInit() {
    this.httpService.fetchApplicationsFromFirebase().subscribe((res) => {
      this.appArray = res;
    });
  }

  subToAppArray() {
    this.httpService.applicationArraySubject.subscribe((appArray) => {

      console.log('appArray', appArray);
    });

  }

  openApplication(application: adoptionApplication) {
    this.openApplicationModal = true;
    this.selectedApplication = application;

  }

  onClose() {
    this.openApplicationModal =false;
  }

  onApprove() {

  }

  onDeny() {
    /* this.httpService.deleteApplicationsFromFirebase(selectedApplication).subscribe((res) => {
      this.appArray = res;
    }) */
  }
}
