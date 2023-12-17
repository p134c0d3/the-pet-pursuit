import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adoptionApplication } from '../models/adoption-application.model';
import { Subject, map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  firebaseRootURL = environment.firebaseRootURL;
  firebaseApplicationsURL = `${this.firebaseRootURL}/Applications.json`;

  applicationArraySubject = new Subject<adoptionApplication[]>();

  constructor(private http: HttpClient, private auth: AuthService) {}

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
    return this.http.get(urlWithAuth).pipe(
      map((app) => {
        return Object.values(app);
      })
    );
  }
}
