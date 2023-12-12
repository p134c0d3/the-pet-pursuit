import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { NewPost } from "../models/new-post.model";


@Injectable ({providedIn: 'root'})
export class DataStorageService {

  firebaseURL = 'https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost.json'
  private newPost: NewPost[] = [];


  constructor(
    private http: HttpClient,
    private authService: AuthService,

  ) {}

  storeNewPost(newPost) {


    this.http.put(this.firebaseURL, newPost)
    .subscribe(response => {
      console.log(response);
    })
  }

}
