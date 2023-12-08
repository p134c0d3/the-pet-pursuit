import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {

  }

  onLogin(form: NgForm) {

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
