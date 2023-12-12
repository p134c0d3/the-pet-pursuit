import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private userSub: Subscription

  constructor(private authService:AuthService) {}

  isAuthenticated=false
  isNavbarActive=false
  isLoading=false




  toggleNav(){
    this.isNavbarActive=!this.isNavbarActive
  }


  ngOnInit(): void {
    this.userSub= this.authService.user.subscribe(user =>{
     this.isAuthenticated= !!user
    })
  }



  onLogout(){
    this.isLoading=true
    setTimeout(() => {
      this.isLoading = false; // Set loading to false after the timeout
    }, 300);
    this.authService.logout()

   }


  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}


