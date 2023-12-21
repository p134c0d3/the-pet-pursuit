import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adoptionApplication } from '../models/adoption-application.model';
import { Subject, map, tap, throwError, catchError, Observable } from 'rxjs';
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
    const applicationId = data.applicationId;
    const authToken = this.auth.getToken();
    if (!authToken) {
      console.error('No auth token found');
      return;
    }
    const urlWithAuth = `https://the-pet-pursuit-default-rtdb.firebaseio.com/applications/${applicationId}.json?auth=${authToken}`;

    this.http.put(urlWithAuth, data).subscribe(
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
    const urlWithAuth = `https://the-pet-pursuit-default-rtdb.firebaseio.com/applications.json?auth=${authToken}`;
    return this.http.get(urlWithAuth).pipe(
      map((app) => {
        if (app === null) {
          return [];
        }
        return Object.values(app);
      })
    );
  }


  deleteApplicationsFromFirebase(id: number): Observable<void> {
    console.log('Request Started:', id);
    const authToken = this.auth.getToken();
    if (!authToken) {
      console.error('No auth token found');
      return throwError('No auth token found');
    }
    const deleteUrl = `https://the-pet-pursuit-default-rtdb.firebaseio.com/applications/${id}.json?auth=${authToken}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => console.log(`Deleted post id: ${id}`)),
      catchError((error) => {
        console.error('Error deleting application:', error);
        return throwError(error);
      })
    );
  }
}
