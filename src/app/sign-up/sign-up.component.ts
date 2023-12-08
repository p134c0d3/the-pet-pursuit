import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})


export class SignUpComponent implements OnInit {

  constructor(private router: Router, private authService:AuthService) { }
  ngOnInit() {

  }

  isLoading=false
  error:string=null

  onSignup(form: NgForm) {
     if(!form.valid){
      return
     }

    const fullname = form.value.fullname;
    const phone = form.value.phone;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading=true

    console.log(form.value)
    this.authService.signup(fullname, phone, username,email,password).subscribe(resData=>{
      console.log(resData);
      this.isLoading=false
      this.router.navigate(['home']);
      form.reset()
    }, errorRes =>{
      console.log(errorRes)
      this.error=errorRes
      this.isLoading=false

    }
    )


    // this.router.navigate(['sign-in']);

    // this.authService.signupUser(fullname, phone, username, email, password);
    // form.reset();

  }

  onCancel() {
    this.router.navigate(['home']);
  }

}
