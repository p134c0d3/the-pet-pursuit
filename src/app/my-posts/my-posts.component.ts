import { Component } from '@angular/core';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent {
  editPost = false;



  editSinglePost() {
    this.editPost = true;
  }

  deleteSinglePost() {

  }
}
