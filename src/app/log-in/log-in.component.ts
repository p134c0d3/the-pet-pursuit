import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  error:string=null
  constructor(private router: Router, private authService:AuthService) { }
  ngOnInit() {

  }

  onLogin(form: NgForm) {

    if(!form.valid){
      return
    }

    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).subscribe(
      resData => {
        this.router.navigate(['home']);
        console.log(resData);
        // isSuccessful=true
       },
       error =>{
        console.log(error)
        this.error='An Error Occurred'
       }
       )


//test



    console.log(form.value)





    // this.router.navigate(['sign-in']);

    // this.authService.signupUser(email, password);
    // form.reset();

  }

  onCancel() {
    this.router.navigate(['home']);
  }

}
