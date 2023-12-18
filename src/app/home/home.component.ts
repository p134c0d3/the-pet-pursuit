import { DataStorageService } from './../services/data-storage.service';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HTTPService } from '../services/HTTPService';
import { NewPost } from '../models/new-post.model';
import { localStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  openModal = false;
  isApplyClicked = false;
  adoptionRequestForm: FormGroup;
  onSubmitClicked = false;
  selectedPet: NewPost = null;

  pets: NewPost[] = [];
  @ViewChild(FormGroupDirective) adoptionFormRef;


  constructor(
    private httpService: HTTPService,
    private dataStorage: DataStorageService,
    private localStorage:localStorageService
  ) {}

  ngOnInit() {
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
      console.log('Fetch Pets', petResults);
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

  onSubmit() {
    this.onSubmitClicked = true;
    if (this.adoptionRequestForm.valid) {
      this.httpService.saveApplicationsToFirebase(this.adoptionRequestForm.value);
      this.adoptionRequestForm.reset();
      this.isApplyClicked = false;
      this.openModal = true;
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
    this.isApplyClicked =false;
    this.adoptionRequestForm.reset();
 }
}
