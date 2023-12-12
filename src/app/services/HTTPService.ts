import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdoptionApplicationService } from './adoption-application.service';
import { adoptionApplication } from '../models/adoption-application.model';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  firebaseRootURL =
  "https://the-pet-pursuit-default-rtdb.firebaseio.com.json"
  firebaseApplicationsURL = "https://the-pet-pursuit-default-rtdb.firebaseio.com/Applications.json"
  applicationData;

  constructor(
    private applicationService: AdoptionApplicationService,
    private http: HttpClient,
  ) { }


  saveApplicationsToFirebase(data) {
    this.http
      .post(this.firebaseApplicationsURL, data).subscribe(res => {
        console.log(res,"res")
    });
  }

  fetchApplicationsFromFirebase() {
    /* return this.http
      .get(this.firebaseApplicationsURL, {})
        .subscribe((res) => {
          console.log("app results", res)
          this.applicationData = res;
          console.log("applicationData", this.applicationData)
        }
        ); */
   /*  return this.http.get(this.firebaseApplicationsURL, {}) */


  return this.http.get(this.firebaseApplicationsURL, {}).pipe(
    tap((res: adoptionApplication) => {
    console.log(res, "res")
    this.applicationService.setApplications();
    })
   );
 }

 storeApplications(results) {
  results.map((result) => {
    console.log("result", result)

  })
 }
}
