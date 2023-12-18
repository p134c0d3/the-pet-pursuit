import { DataStorageService } from './../services/data-storage.service';
import { Component } from '@angular/core';
import { NewPost } from '../models/new-post.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent {
  editPost = false;
  pets: NewPost[] = [];



  editSinglePost() {
    this.editPost = true;
  }

  deleteSinglePost() {

  }
}
