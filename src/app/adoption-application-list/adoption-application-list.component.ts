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
    const selectedApplicationId = this.selectedApplication?.appID;
    console.log('selected application', this.selectedApplication)
    if (selectedApplicationId) {
      console.log('selected application id', this.selectedApplication.appID)
    this.httpService.deleteApplicationsFromFirebase(selectedApplicationId).subscribe((res: adoptionApplication[]) => {
      this.appArray = res;
    });
    } else {
      console.error('No id provided');
    }
  }
}
