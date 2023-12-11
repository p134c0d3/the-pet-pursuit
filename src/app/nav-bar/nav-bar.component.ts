import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isNavbarActive=false;
  isLogin = false;
  private sub: Subscription;

  constructor (private authService: AuthService) {}

  //user object is not null when user is logged in

  ngOnInit() {
    this.sub = this.authService.user
    .subscribe(user => {
      this.isLogin = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  toggleNav(){
    this.isNavbarActive=!this.isNavbarActive
  }
}



