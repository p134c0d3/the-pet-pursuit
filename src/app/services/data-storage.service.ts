import { NewPost } from './../models/new-post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';
import {
  Observable,
  Subject,
  catchError,
  from,
  map,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';

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
    const appID = newPost.id;
    this.http
      .put(
        `https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost/${appID}.json`,
        newPost
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // need to create modify adoptionApplication model and call this function
  storeAdoptionApplication(adoptionApplication) {
    this.http
      .put(this.firebaseURL, adoptionApplication)
      .subscribe((response) => {
        console.log(response);
      });
  }

  // deletePostFromFirebase(id: number) {
  //   console.log('Request Started:', id);
  //   const authToken = this.auth.getToken();
  //   if (!authToken) {
  //     console.error('No auth token found');
  //     return;
  //   }
  //   const deleteUrl = `https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost/${id}.json?auth=${authToken}`;
  //   return this.http.delete(deleteUrl).pipe(
  //     catchError((error) => {
  //       console.error('Error deleting application:', error);
  //       return throwError(error);
  //     })
  //   );
  // }

  deletePostFromFirebase(id: number): Observable<void> {
    console.log('Request Started:', id);
    const authToken = this.auth.getToken();
    if (!authToken) {
      console.error('No auth token found');
      return throwError('No auth token found');
    }
    const deleteUrl = `https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost/${id}.json?auth=${authToken}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => console.log(`Deleted post id: ${id}`)),
      catchError((error) => {
        console.error('Error deleting application:', error);
        return throwError(error);
      })
    );
  }
  saveEditedPostToFirebase(id: number, newPostData: any): Observable<any> {
    return from(this.auth.getToken()).pipe(
      switchMap((token: string) => {
        const url = `https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost/${id}.json?auth=${token}`;
        return this.http.put(url, newPostData);
      }),
      catchError((error) => {
        console.error('Error updating post:', error);
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
