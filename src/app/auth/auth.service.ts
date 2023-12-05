import { Inject, Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'


//this is optional but may need it
interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string
}



@Injectable({providedIn:'root'})


export class AuthService{
  constructor(private http:HttpClient){}


  signup(email:string, password:string){
    return this.http.post<AuthResponseData>(
      ' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWBFOaq2Dsx2DqeEUDClLQ7bMV5HupJ-Y',
    {email:email,
     password:password,
     returnSecureToken: true
    }
    )
  }



}

///stoped at sending the signup request...need form




//sign up
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


//signin
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
