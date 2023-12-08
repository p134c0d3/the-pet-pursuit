import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {

  }

  onSignup(form: NgForm) {

    const fullname = form.value.fullname;
    const phone = form.value.phone;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    console.log(form.value)

    this.router.navigate(['home']);
    // this.router.navigate(['sign-in']);

    // this.authService.signupUser(email, password);
    // form.reset();

  }

  onCancel() {
    this.router.navigate(['home']);
  }

}
