import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../services/HTTPService';
import { AdoptionApplicationService } from '../services/adoption-application.service';
import { adoptionApplication } from '../models/adoption-application.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adoption-application-list',
  templateUrl: './adoption-application-list.component.html',
  styleUrls: ['./adoption-application-list.component.scss']
})
export class AdoptionApplicationListComponent implements OnInit {
  appArray: adoptionApplication[] = [];

  constructor(private httpService: HTTPService) {}


  ngOnInit() {

    this.httpService.fetchApplicationsFromFirebase().subscribe((res) => {
      this.appArray = res;
    });


  }
    /* this.httpService.fetchApplicationsFromFirebase() */
  subToAppArray() {
    this.httpService.applicationArraySubject.subscribe((appArray) => {
      console.log("appArray", appArray)
      debugger
    })
  }
};




  /* delete(): void {
    this.applicationService.deleteApplication().subscribe();
  } */

