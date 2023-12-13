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
  applications: adoptionApplication = {
 petName: '',
 firstName: '',
 lastName: '',
 streetNumber: 0,
 streetName: '',
 city: '',
 state: '',
 zipCode: 0,
 phoneNumber: 0,
 email: '',
 housingType: '',
 whenHome: '',
 whenNotHome: '',
 employment: '',
 commitment: '',
 surrender: '',
 ageCheck: false,
 termsConditions: false,
 hhName: [],
 hhAge: [],
 hhPet: [],
 petType: [],
 petAge: [],
 message: '',
  }
  constructor(private httpService: HTTPService) {}


  ngOnInit(): void {
    /* this.httpService.fetchApplicationsFromFirebase().subscribe((res) => {
      console.log(res, "res")
      return res
    }) */
    this.httpService.fetchApplicationsFromFirebase();
  }


  //  get(){
  //   this.httpService.fetchApplicationsFromFirebase();
  //  }


  /* delete(): void {
    this.applicationService.deleteApplication().subscribe();
  } */
}
