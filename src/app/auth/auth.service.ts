import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment.prod';

//this is optional but may need it
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  API_KEY = environment.API_KEY;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData ? userData._token : null;
  }

  signup(
    fullname: string,
    phone: number,
    username: string,
    email: string,
    password: string
  ) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          fullname: fullname,
          phone: phone,
          username: username,
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken
          );
        })
      );
  }

  private handleAuthentication(email: string, userId: string, token: string) {
    const user = new User(email, userId, token);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    // this.router.navigate([''])//need to finish
  }

  private handleError(errorRes: HttpErrorResponse) {
    // let errorMessage='An unknown eror occured! 😿';
    let errorMessage =
      'This email/password is not correct or does not exist! 😿';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists! 😿';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist! 😿 ';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This email or password is not correct! 😿';
        break;
    }
    return throwError(errorMessage);
  }
}
