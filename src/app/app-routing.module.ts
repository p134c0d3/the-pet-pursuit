import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdoptionApplicationListComponent } from './adoption-application-list/adoption-application-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewPostComponent } from './new-post/new-post.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'nav-bar', component: NavBarComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'log-in', component: LogInComponent},
  { path: 'incomingApplications', component: AdoptionApplicationListComponent },
  { path: 'new-post', component: NewPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
