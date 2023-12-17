import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Pet } from '../models/home.model';
import { HTTPService } from '../services/HTTPService';
import { adoptionApplication } from '../models/adoption-application.model';

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
  onSubmitClicked = false;

  pets: Pet[] = [
    new Pet(
      'Cowboy',
      'Cattle Dog',
      'http://source.unsplash.com/200x200/?cattledog',
      'Cowboy is an energetic dog...'
    ),
    new Pet(
      'Lila',
      'Great Dane',
      'http://source.unsplash.com/200x200/?greatdane',
      'Lila loves long walks on the beach...'
    ),
    new Pet(
      'Brutus',
      'Rottweiler',
      'http://source.unsplash.com/200x200/?rottweiler',
      'Brutus loves to be buried in plush toys...'
    ),
  ];

  allApplications: adoptionApplication[] = [];

  constructor(private httpService: HTTPService) {}

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
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
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
  }


  onSubmit() {
    this.onSubmitClicked = true;

    if (this.adoptionRequestForm.valid) {
      this.adoptionRequestFormHasBeenSubmitted = true;
      this.httpService.saveApplicationsToFirebase(
        this.adoptionRequestForm.value
      );
      this.adoptionRequestForm.reset();
      this.isApplyClicked = false;
      this.openModal = true;
      console.log('form is valid');
    } else {
      debugger
      console.log('form is not valid');
    }
  }

  applyButtonClicked(): void {
    this.isApplyClicked = true;
    this.openModal = false;

  }

  onCancel() {
    this.isApplyClicked =false;
    this.adoptionRequestForm.reset();
    debugger
  }

  petPicsPost() {}

  getPetPics;
}
