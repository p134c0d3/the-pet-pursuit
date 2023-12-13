import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdoptionApplicationService } from './adoption-application.service';
import { adoptionApplication } from '../models/adoption-application.model';
import { exhaustMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  firebaseRootURL = 'https://the-pet-pursuit-default-rtdb.firebaseio.com';
  firebaseApplicationsURL = `${this.firebaseRootURL}/Applications.json`;
  applicationData;

  constructor(
    private applicationService: AdoptionApplicationService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  saveApplicationsToFirebase(data) {
    const authToken = this.auth.getToken();
    if (!authToken) {
      console.error('No auth token found');
      return;
    }
    const urlWithAuth = `${this.firebaseApplicationsURL}?auth=${authToken}`;

    this.http.post(urlWithAuth, data).subscribe(
      (res) => console.log('Application submitted:', res),
      (error) => console.error('Error submitting application:', error)
    );
  }




  fetchApplicationsFromFirebase() {
   return this.auth.user.pipe(
    take(1),
    exhaustMap(user =>{
    return this.http.get(
      this.firebaseApplicationsURL
      )
   }),  tap((res: adoptionApplication) => {
    console.log(res, 'res');
    this.applicationService.setApplications();
  }))

}







    /* return this.http
      .get(this.firebaseApplicationsURL, {})
        .subscribe((res) => {
          console.log("app results", res)
          this.applicationData = res;
          console.log("applicationData", this.applicationData)
        }
        ); */
    /*  return this.http.get(this.firebaseApplicationsURL, {}) */



    //last known work

    // return this.http.get(this.firebaseApplicationsURL, {}).pipe(
    //   tap((res: adoptionApplication) => {
    //     console.log(res, 'res');
    //     this.applicationService.setApplications();
    //   })
    // );


  // storeApplications(results) {
  //   results.map((result) => {
  //     console.log('result', result);
  //   });
  // }
}
