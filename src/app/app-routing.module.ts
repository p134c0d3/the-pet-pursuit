import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdoptionApplicationListComponent } from './adoption-application-list/adoption-application-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from './auth/auth.guard';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyPostsEditComponent } from './my-posts-edit/my-posts-edit.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'nav-bar', component: NavBarComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'log-in', component: LogInComponent},
  { path: 'new-post', component: NewPostComponent },
  { path: 'incomingApplications', canActivate:[AuthGuard], component: AdoptionApplicationListComponent },
  { path: 'my-posts', canActivate:[AuthGuard], component: MyPostsComponent },
  { path: 'my-posts/my-posts-edit', canActivate:[AuthGuard], component: MyPostsEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
