import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  ngOnInit(): void {}

  newPost(form: NgForm) {

    const petName = form.value.petName;
    const petType = form.value.petType;
    const sex = form.value.sex;
    const location = form.value.location;
    const description = form.value.description;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const phone = form.value.phone;

  }
}
