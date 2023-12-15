import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdoptionApplicationService } from './adoption-application.service';
import { adoptionApplication } from '../models/adoption-application.model';
import { exhaustMap, map, take, tap } from 'rxjs';
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

  posts:any[]=[]

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

  return this.http.get(urlWithAuth).pipe(map(resData=>{
    const postsArray=[]
    for(const key in resData){
      if(resData.hasOwnProperty(key))
      postsArray.push({...resData[key], id:key})
    }
    return postsArray
  })

  )

  }













}
