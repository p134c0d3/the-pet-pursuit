import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HTTPService } from '../services/HTTPService';
import { adoptionApplication } from '../models/adoption-application.model';

@Component({
  selector: 'app-adoption-application-list',
  templateUrl: './adoption-application-list.component.html',
  styleUrls: ['./adoption-application-list.component.scss'],
})
export class AdoptionApplicationListComponent implements OnInit, OnChanges {
  appArray: adoptionApplication[] | null = [];
  constructor(private httpService: HTTPService) {}
  openApplicationModal = false;
  selectedApplication: adoptionApplication = null;

  ngOnInit() {
    this.httpService.fetchApplicationsFromFirebase().subscribe((res) => {
      this.appArray = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.httpService.fetchApplicationsFromFirebase().subscribe((res) => {
    //   this.appArray = res;
    // });
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
    this.openApplicationModal = false;
  }

  onApprove() {}

  onDeny(applicationId: number) {
    this.httpService
      .deleteApplicationsFromFirebase(applicationId)
      .subscribe((res) => {
        console.log(res);
      });
    this.openApplicationModal = false;

    this.fetchAppsFromFirebase();

  }

  fetchAppsFromFirebase() {
    this.httpService.fetchApplicationsFromFirebase().subscribe((res) => {
      this.appArray = res;

      // setTimeout(() => {
      //   this.httpService.fetchApplicationsFromFirebase();
      //   debugger;
      //   console.log('timeout');
      // }, 1000);
    });

  }
}
