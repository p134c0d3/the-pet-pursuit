import { Component } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { newPost } from '../models/new-post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})

export class NewPostComponent {
  isApplyClicked = false;
  newPostForm: FormGroup;
  newPostFormHasBeenSubmitted = false;

  constructor() {}

  ngOnInit() {
    this.newPostForm = new FormGroup({
    petName: new FormControl(null, Validators.required),
    petType: new FormControl(null, Validators.required),
    petGender: new FormControl(null, Validators.required),
    petAge: new FormControl(null, Validators.required),
    spayedNeutered: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    petDescription: new FormControl(null, Validators.required),
    message: new FormControl(),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),

  })
}

onSubmit(formObj: NgForm) {
  console.log('Form Submitted', formObj.value);
  this.newPostFormHasBeenSubmitted = true;
}

applyButtonClicked(): void {
  this.isApplyClicked = true;
}

}
