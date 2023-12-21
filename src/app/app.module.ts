import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewPostComponent } from './new-post/new-post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { AdoptionApplicationListComponent } from './adoption-application-list/adoption-application-list.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PetService } from './services/pet.service';
import { DataStorageService } from './services/data-storage.service';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from './footer/footer.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyPostsEditComponent } from './my-posts-edit/my-posts-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpComponent,
    NewPostComponent,
    HomeComponent,
    AdoptionApplicationListComponent,
    LogInComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    FavoritesComponent,
    MyPostsComponent,
    MyPostsEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PetService,
    DataStorageService,
    AuthService,
    {provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
