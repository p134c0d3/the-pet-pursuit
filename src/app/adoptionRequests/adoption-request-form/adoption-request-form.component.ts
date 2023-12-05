import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adoption-request-form',
  templateUrl: './adoption-request-form.component.html',
  styleUrls: ['./adoption-request-form.component.scss']
})
export class AdoptionRequestFormComponent {
  adoptionRequestForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.adoptionRequestForm = new FormGroup({
    petName: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    streetNumber: new FormControl(),
    streetName: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    zipCode: new FormControl(),
    phoneNumber: new FormControl,
    email: new FormControl(),
    housingType: new FormControl(),
    hhName: new FormControl(),
    hhAge: new FormControl,
    hhPet: new FormControl(),
    petType: new FormControl(),
    petAge: new FormControl,
    whenHome: new FormControl(),
    whenNotHome: new FormControl(),
    employment: new FormControl(),
    commitment: new FormControl(),
    surrender: new FormControl(),
    message: new FormControl(),
    ageCheck: new FormControl(),
    termsConditions: new FormControl(),

    })
  }

  onSubmit() {
    console.log('Form Submitted', this.adoptionRequestForm);
  }
}
