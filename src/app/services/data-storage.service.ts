import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { NewPost } from '../models/new-post.model';
import { environment } from 'src/environments/environment.prod';
import { Subject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  firebaseURL = environment.firebaseURL;
  private newPost: NewPost[] = [];
  allPets = new Subject<NewPost[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  // need to create pet model and pet service
  // get array of pets then put it to the DB

  // storePet(pets: Pet[]) {
  //   //const pets = this.petService.getPets();
  //   this.http.put(this.firebaseURL, pets)
  //   .subscribe(response => {
  //     console.log(response);
  //   })
  // };

  // need to create pet service for fetching list of pets from DB
  fetchPets() {
    return this.http
      .get('https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost.json')
      .pipe(
        map((pet) => {
          console.log('Pets fetched: ', pet);
          return Object.values(pet);
        })
      );
  }
  // fetchPets() {
  //   return this.http
  //   .get(
  //     'https://the-pet-pursuit-default-rtdb.firebaseio.com/Pet.json').subscribe (pets => {
  //       console.log(pets);
  //     });

  // }
}
