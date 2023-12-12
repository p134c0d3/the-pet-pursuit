import { Component } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';



import { NewPost } from '../models/new-post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})

export class NewPostComponent {
  isApplyClicked = false;
  newPostForm: FormGroup;
  newPostFormHasBeenSubmitted = false;
  // onLogin: any;


  constructor(private router: Router, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.newPostForm = new FormGroup({
    petName: new FormControl(null, Validators.required),
    petType: new FormControl(null, Validators.required),
    petBreed: new FormControl(),

    petGender: new FormControl(null, Validators.required),
    petAge: new FormControl(null, Validators.required),
    spayedNeutered: new FormControl(null, Validators.required),
    petLocation: new FormControl(null, Validators.required),
    petDescription: new FormControl(null, Validators.required),
    message: new FormControl(),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),

  })
}

onSubmit() {
  const newPost = new
  console.log(this.newPostForm.value);
  this.newPostFormHasBeenSubmitted = true;
  this.dataStorageService.storeNewPost(newPostForm);

}

onCancel() {
  this.router.navigate(['home']);
}

// applyButtonClicked(): void {
//   this.isApplyClicked = true;
// }

}
