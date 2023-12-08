import {Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";


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
  user=new BehaviorSubject <User>(null)
  constructor(private http:HttpClient, private router:Router) {}


  signup(fullname:string, phone:number, username:string, email:string, password:string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWBFOaq2Dsx2DqeEUDClLQ7bMV5HupJ-Y',
    {
      fullname:fullname,
      phone:phone,
      username:username,
      email:email,
      password:password,
     returnSecureToken: true
    },


    ).pipe(catchError(this.handleError), tap(resData=>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken)
    }))

  }




  login(email:string, password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWBFOaq2Dsx2DqeEUDClLQ7bMV5HupJ-Y',
    {email:email,
      password:password,
      returnSecureToken: true,
      
     }
    ).pipe(
      catchError(this.handleError),
      tap(resData=>{
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken
        )
  })
    )
}

  private handleAuthentication(

    email:string,
    userId:string,
    token:string
    ){
    const user =new User(email, userId, token)

    this.user.next(user)
    localStorage.setItem("userData", JSON.stringify(user))


  }

  logout(){
    this.user.next(null)
    // this.router.navigate([''])//need to finish
  }



  private handleError(errorRes: HttpErrorResponse){
    let errorMessage='an unknown eror occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message){
      case 'Email_Exits':
        errorMessage="this email exist already"
        break;
        case 'email_not_found':
        errorMessage='this email does not exist'
        break;
        case 'inavalid_passowrd':
          errorMessage='this password is not correct'
          break;
        }
        return throwError(errorMessage)

      }





}
























//sign up
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


//signin
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
