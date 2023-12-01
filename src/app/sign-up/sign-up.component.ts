import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  ngOnInit() {

  }

  onSignup(form: NgForm) {

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

  }

}
