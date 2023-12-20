import { NewPost } from './../models/new-post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Subject, catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  firebaseURL = environment.firebaseURL;
  private newPost: NewPost[] = [];
  private updatedPost: NewPost[] = [];
  allPets = new Subject<NewPost[]>();
  everyPet = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {}
  storeNewPost(newPost) {
    this.http.post(this.firebaseURL, newPost).subscribe((response) => {
      console.log(response);
    });
  }

  // need to create modify adoptionApplication model and call this function
  storeAdoptionApplication(adoptionApplication) {
    this.http
      .post(this.firebaseURL, adoptionApplication)
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePostFromFirebase(id: number) {
    if (!id) {
      console.error('No id provided');
      return throwError('No id provided');
    }
    const authToken = this.auth.getToken();
    if (!authToken) {
      console.error('No auth token found');
      return;
    }
    const deleteUrl = `https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost/${id}.json?auth=${authToken}`;
    return this.http.delete(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error deleting application:', error);
        return throwError(error);
      })
    );
  }
  saveEditedPostToFirebase(id: number, newPostData: any) {
    if (!id) {
      console.error('No id provided');
      return throwError('No id provided');
    }
    const authToken = this.auth.getToken();
    console.log(authToken);

    if (!authToken) {
      console.error('No auth token found');
      return;
    }
    const editUrl = `${this.firebaseURL}/newpost/${id}.json?auth=${authToken}`;
    return this.http.patch(editUrl, newPostData).pipe(
      catchError((error) => {
        console.error('Error deleting application:', error);
        return throwError(error);
      })
    );
  }

  // need to create pet service for fetching list of pets from DB
  fetchPets() {
    return this.http

      .get('https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost.json')
      .pipe(
        map((pet) => {
          return Object.values(pet);
        })
      );
  }

}
