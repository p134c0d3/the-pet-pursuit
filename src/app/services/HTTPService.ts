import { HttpClient, HttpParams } from '@angular/common/http';
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
  const authToken = this.auth.getToken();

  if (!authToken) {
    console.error('No auth token found');
    return;
  }

  const urlWithAuth = `${this.firebaseApplicationsURL}?auth=${authToken}`;

  this.http.get(urlWithAuth).subscribe(
    (data) => {
      console.log(data);
      // Handle the fetched data as needed
    },
    (error) => {
      console.error('Error fetching applications:', error);
    }
  );
}


//from max code
//   fetchApplicationsFromFirebase() {
//    return this.auth.user.pipe(
//     take(1),
//     exhaustMap(user =>{
//     return this.http.get(
//       this.firebaseApplicationsURL,
//       {
//         params:new HttpParams().set('auth', user.token)
//       }
//       )
//    }),  tap((res: adoptionApplication) => {
//     console.log(res, 'res');
//     // this.applicationService.setApplications();
//   }))

// }








// fetchApplicationsFromFirebase() {
//   this.http.get(this.firebaseApplicationsURL).subscribe(data =>{
//     console.log(data)
//   })

// }















}
