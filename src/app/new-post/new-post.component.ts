import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { newPost } from './new-post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {


  newPostForm: newPost = {
    petName: "",
    petType: "",
    sex: "",
    age: "",
    spayedNeutered: "",
    location: "",
    petDescription: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  };

  ngOnInit(): void {

  }

  onSubmit(formObj: NgForm) {

    const { petName, petType, sex, age, spayedNeutered,  location, petDescription, firstName, lastName, email, phoneNumber } = formObj.value;

    this.newPostForm = new newPost( petName, petType, sex, age, spayedNeutered, location, petDescription, firstName, lastName, email, phoneNumber );

  };

}
