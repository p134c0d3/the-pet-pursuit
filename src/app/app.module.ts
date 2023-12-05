import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdoptionRequestFormComponent } from './adoptionRequests/adoption-request-form/adoption-request-form.component';
import { RequestListComponent } from './adoptionRequests/request-list/request-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpComponent,
    AdoptionRequestFormComponent,
    RequestListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
