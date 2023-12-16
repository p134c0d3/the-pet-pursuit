import { DataStorageService } from './../services/data-storage.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HTTPService } from '../services/HTTPService';
import { adoptionApplication } from '../models/adoption-application.model';
import { Pet } from '../models/pet-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  openModal = false;
  isApplyClicked = false;
  adoptionRequestForm: FormGroup;
  adoptionRequestFormHasBeenSubmitted = false;
  incompleteSections: string[] = [];
  onSubmitClicked = false;
  selectedPet: Pet = null;

  pets: Pet[] = [];

  allApplications: adoptionApplication[] = [];

  constructor(
    private httpService: HTTPService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    this.adoptionRequestForm = new FormGroup({
      petName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      streetNumber: new FormControl(null, Validators.required),
      streetName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
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
      ageCheck: new FormControl(null, Validators.required),
      termsConditions: new FormControl(null, Validators.required),
    });

    this.fetchPets();
  }

  fetchPets() {
    this.dataStorage.fetchPets().subscribe((petResults) => {
      this.pets = petResults.map((pet) => ({
        petName: pet.petName,
        petBreed: pet.petBreed,
        message: pet.message,
        imagePath: `http://source.unsplash.com/200x200/?dog,${pet.petBreed}`,
        petAge: pet.age,
        petGender: pet.petGender,
        petFixed: pet.spayedNeutered,
      }));
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
  }

  onSubmit() {
    this.onSubmitClicked = true;

    if (
      this.adoptionRequestForm.valid &&
      this.incompleteSections.length === 0
    ) {
      this.adoptionRequestFormHasBeenSubmitted = true;
      this.httpService.saveApplicationsToFirebase(
        this.adoptionRequestForm.value
      );
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
}
