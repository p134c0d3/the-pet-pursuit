import { DataStorageService } from './../services/data-storage.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';


import { HTTPService } from '../services/HTTPService';
import { NewPost } from '../models/new-post.model';
import { localStorageService } from '../services/local-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy  {
  openModal = false;
  openTermsModal = false;
  isApplyClicked = false;
  adoptionRequestForm: FormGroup;
  onSubmitClicked = false;
  selectedPet: NewPost = null;
  private userSub: Subscription;
  isAuthenticated = false;
  applicationId: any;


  pets: NewPost[] = [];

  constructor(
    private httpService: HTTPService,
    private dataStorage: DataStorageService,
    private localStorage:localStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.adoptionRequestForm = new FormGroup({
      applicationId: new FormControl(this.generateAppID()),
      petName: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      streetNumber: new FormControl(null, Validators.required),
      streetName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      housingType: new FormControl(null, Validators.required),
      hhName1: new FormControl(null),
      hhName2: new FormControl(null),
      hhName3: new FormControl(null),
      hhName4: new FormControl(null),
      hhName5: new FormControl(null),
      hhName6: new FormControl(null),
      hhAge1: new FormControl(null),
      hhAge2: new FormControl(null),
      hhAge3: new FormControl(null),
      hhAge4: new FormControl(null),
      hhAge5: new FormControl(null),
      hhAge6: new FormControl(null),
      hhPet1: new FormControl(null),
      hhPet2: new FormControl(null),
      hhPet3: new FormControl(null),
      petType1: new FormControl(null),
      petType2: new FormControl(null),
      petType3: new FormControl(null),
      petAge1: new FormControl(null),
      petAge2: new FormControl(null),
      petAge3: new FormControl(null),
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
        imagePath: `http://source.unsplash.com/200x200/?${
          pet.petType
        },${pet.petBreed.replaceAll(' ', '+')}`,
        goodWithChildren: pet.goodWithChildren,
        housetrained: pet.housetrained,
        goodWithDogs: pet.goodWithDogs,
        goodWithCats: pet.goodWithCats,
      }));
      return this.pets;
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
    this.adoptionRequestForm.patchValue({ petName: this.selectedPet.petName });
  }

  onSubmit() {
    this.onSubmitClicked = true
    if (this.adoptionRequestForm.valid) {
      this.httpService.saveApplicationsToFirebase(this.adoptionRequestForm.value);
      this.isApplyClicked = false;
      this.adoptionRequestForm.reset();
      this.onSubmitClicked = false;
      console.log('form is valid');
    } else {
      console.log('form is not valid');
    }
  }

  applyButtonClicked(): void {
    this.isApplyClicked = true;
    this.openModal = false;
  }

  addFav(){

    if(this.selectedPet){
      this.localStorage.addFavorite(this.selectedPet)
      console.log('Pet added to favorites:', this.selectedPet);
    }

  }

  onCancel() {
    this.onSubmitClicked = false;
    this.isApplyClicked = false;
    this.adoptionRequestForm.reset();
 }


 ngOnDestroy(): void {
  this.userSub.unsubscribe()
}

  openTermsConditions() {
    this.openTermsModal = true;
  }



 generateAppID(): number {
  return Math.floor(Math.random() * 9000) + 1000;
}

}
