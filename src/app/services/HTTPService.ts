import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adoptionApplication } from '../models/adoption-application.model';
import { Subject, catchError, map, tap, throwError } from 'rxjs';
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


 /*  deleteApplicationsFromFirebase() {
    const authToken = this.auth.getToken();
    if(!authToken) {
      return;
      debugger
    }
    const deleteUrl = `${this.firebaseApplicationsURL}?auth=${authToken}`;
    return this.http.delete(deleteUrl);
  } */


  deleteApplicationsFromFirebase(id: number) {
    if (!id) {
      console.error('No id provided');
      return throwError('No id provided');
    }
    const authToken = this.auth.getToken();
    if (!authToken) {
      console.error('No auth token found');
      return;
    }
    const deleteUrl = `https://the-pet-pursuit-default-rtdb.firebaseio.com/Applications/${id}.json?auth=${authToken}`;
    return this.http.delete(deleteUrl).pipe(
      catchError((error) => {
        debugger
        console.error('Error deleting application:', error);
        return throwError(error);
      })
    );
  }
}


