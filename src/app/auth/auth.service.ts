import {Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Router } from "@angular/router";


//this is optional but may need it
interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean
}



@Injectable({providedIn:'root'})


export class AuthService{
  constructor(private http:HttpClient, private router:Router) {}


  signup(fullname:string, phone:number, email:string, username:string, password:string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWBFOaq2Dsx2DqeEUDClLQ7bMV5HupJ-Y',
    {
      fullname:fullname,
      phone:phone,
      email:email,
      username:username,
      password:password,
     returnSecureToken: true
    }) }



  login(email:string, password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWBFOaq2Dsx2DqeEUDClLQ7bMV5HupJ-Y',
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
