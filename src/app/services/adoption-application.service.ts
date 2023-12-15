import { Injectable } from '@angular/core';
import { adoptionApplication } from '../models/adoption-application.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdoptionApplicationService {
  firebaseApplicationsURL =
    environment.firebaseApplicationsURL;

  private allApplications: adoptionApplication[] = [];

  constructor(private http: HttpClient) {}

  setApplications() {
    /* this.allApplications = data || []; */
  }
}
