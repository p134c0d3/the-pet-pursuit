import { DataStorageService } from './../services/data-storage.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HTTPService } from '../services/HTTPService';
import { NewPost } from '../models/new-post.model';
import { localStorageService } from '../services/local-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent  implements OnInit, OnDestroy  {
  favorites:any[]
  openModal = false;
  isApplyClicked = false;
  adoptionRequestForm: FormGroup;
  onSubmitClicked = false;
  selectedPet: NewPost = null;
  private userSub: Subscription;
  isAuthenticated = false;


  pets: NewPost[] = [];
  @ViewChild(FormGroupDirective) adoptionFormRef;


  constructor(
    private httpService: HTTPService,
    private dataStorage: DataStorageService,
    private localStorage:localStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.favorites=this.localStorage.getFavorites() || []
        let storedFavorites=this.localStorage.getFavorites()
        this.favorites=storedFavorites
    this.adoptionRequestForm = new FormGroup({
      petName: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      streetNumber: new FormControl(null, Validators.required),
      streetName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null,Validators.compose([Validators.required, Validators.email])),
      housingType: new FormControl(null, Validators.required),
      hhName: new FormControl(null),
      hhAge: new FormControl(null),
      hhPet: new FormControl(null),
      petType: new FormControl(null),
      petAge: new FormControl(null),
      whenHome: new FormControl(null, Validators.required),
      whenNotHome: new FormControl(null, Validators.required),
      employment: new FormControl(null, Validators.required),
      commitment: new FormControl(null, Validators.required),
      surrender: new FormControl(null, Validators.required),
      message: new FormControl(null),
      ageCheck: new FormControl(null, Validators.requiredTrue),
      termsConditions: new FormControl(null, Validators.requiredTrue),
    });

    this.fetchPets();

    this.userSub= this.authService.user.subscribe(user =>{
      this.isAuthenticated= !!user
     })
  }

  fetchPets() {
    this.dataStorage.fetchPets().subscribe((petResults) => {
      this.pets = petResults.map((pet) => ({
        id: pet.id,
        petName: pet.petName,
        petType: pet.petType,
        petBreed: pet.petBreed,
        petGender: pet.petGender,
        petAge: pet.petAge,
        spayedNeutered: pet.spayedNeutered,
        petLocation: pet.petLocation,
        petDescription: pet.petDescription,
        message: pet.message,
        firstName: pet.firstName,
        lastName: pet.lastName,
        email: pet.email,
        phoneNumber: pet.phoneNumber,
        imagePath: `http://source.unsplash.com/200x200/?${pet.petType},${pet.petBreed}`,
        goodWithChildren: pet.goodWithChildren,
        housetrained: pet.housetrained,
        goodWithDogs: pet.goodWithDogs,
        goodWithCats: pet.goodWithCats,
      }));
      // console.log('Fetch Pets', petResults);
    });
  }

  subToPetsArray() {
    this.dataStorage.allPets.subscribe((Pet) => {
      console.log('All Pets', Pet);
    });
  }

  openPetDetails(pet: any) {
    this.openModal = true;
    this.selectedPet = pet;
    this.adoptionRequestForm.patchValue({petName: this.selectedPet.petName});

  }



  applyButtonClicked(): void {
    this.isApplyClicked = true;
    this.openModal = false;

  }




  onCancel() {
    this.onSubmitClicked = false;
    this.isApplyClicked =false;
    this.adoptionRequestForm.reset();
 }




  deleteFav(e){
    console.log(e)
    this.favorites.forEach((value,index) =>{
      if(value==e)

      this.favorites.splice(index,1)
      console.log(this.favorites)

      // Update local storage
      this.localStorage.updateLocalStorage();
    })

}



 ngOnDestroy(): void {
  this.userSub.unsubscribe()
}
}





