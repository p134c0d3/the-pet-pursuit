import { Injectable } from '@angular/core';
import { adoptionApplication } from '../models/adoption-application.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdoptionApplicationService {
  firebaseApplicationsURL =
    'https://the-pet-pursuit-default-rtdb.firebaseio.com/Applications.json';

  private allApplications: adoptionApplication[] = [];

  constructor(private http: HttpClient) {}

  /*  getApplications(): Observable<adoptionApplication[]> {
    return this.http.get<adoptionApplication[]>(this.firebaseApplicationsURL)

  } */

  setApplications() {
    /* this.allApplications = data || []; */
  }
}
