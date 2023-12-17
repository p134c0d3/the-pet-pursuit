import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { NewPost } from "../models/new-post.model";
import { adoptionApplication } from "../models/adoption-application.model";
import { Pet } from "../models/pet-model";
import { tap } from "rxjs";
import { PetService } from "./pet.service";


@Injectable ({providedIn: 'root'})
export class DataStorageService implements OnInit {

  firebaseURL = 'https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost.json'
  private newPost: NewPost[] = [];
  private adoptionApplication: adoptionApplication[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private petService: PetService

  ) {}

  ngOnInit (){

  }
  storeNewPost(newPost) {

    this.http.post(this.firebaseURL, newPost)
    .subscribe(response => {
      console.log(response);
    })
  };

  // need to create modify adoptionApplication model and call this function
  storeAdoptionApplication(adoptionApplication) {

    this.http.post(this.firebaseURL, adoptionApplication)
    .subscribe(response => {
      console.log(response);
    })
  };

  // need to create pet model and pet service
  // get array of pets then put it to the DB

  storePet() {
    const pets = this.petService.getPets();
    this.http.post(this.firebaseURL, pets)
    .subscribe(response => {
      console.log(response);
    })
  };

  // need to create pet service for fetching list of pets from DB
  fetchPets() {
    return this.http
    .get<Pet[]>(
      'https://the-pet-pursuit-default-rtdb.firebaseio.com/newPost.json',)
      .pipe(
        tap(pets => {
          this.petService.setPets(pets)
        })
      );
      }

  }



