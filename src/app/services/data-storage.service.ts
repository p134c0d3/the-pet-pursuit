import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { NewPostComponent } from "../new-post/new-post.component";
import { FormControl, FormGroup } from "@angular/forms";


@Injectable ({providedIn: 'root'})
export class DataStorageService {
  newPostForm: any;
  firebaseURL = 'https://the-pet-pursuit-default-rtdb.firebaseio.com/newpost.json'
  private newPost =[];

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
