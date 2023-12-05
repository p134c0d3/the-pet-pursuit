import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestListComponent } from './adoptionRequests/request-list/request-list.component';
import { AppComponent } from './app.component';


const routes: Routes = [

    { path: 'home', component: AppComponent },
    { path: 'incomingApplications', component: RequestListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
