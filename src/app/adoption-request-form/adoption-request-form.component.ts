import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-adoption-request-form',
  templateUrl: './adoption-request-form.component.html',
  styleUrls: ['./adoption-request-form.component.scss']
})
export class AdoptionRequestFormComponent {
  adoptionRequestForm: FormGroup;
  openApplicationModal = false;
  adoptionRequestFormHasBeenSubmitted = false;

  constructor() {}

  ngOnInit() {
    this.adoptionRequestForm = new FormGroup({
    petName: new FormControl(),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    streetNumber: new FormControl(null, Validators.required),
    streetName: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    housingType: new FormControl(null, Validators.required),
    hhName: new FormControl(),
    hhAge: new FormControl,
    hhPet: new FormControl(),
    petType: new FormControl(),
    petAge: new FormControl(),
    whenHome: new FormControl(null, Validators.required),
    whenNotHome: new FormControl(null, Validators.required),
    employment: new FormControl(null, Validators.required),
    commitment: new FormControl(null, Validators.required),
    surrender: new FormControl(null, Validators.required),
    message: new FormControl(),
    ageCheck: new FormControl(null, Validators.required),
    termsConditions: new FormControl(null, Validators.required),

    })
  }

  onSubmit(formObj: NgForm) {
    console.log('Form Submitted', formObj.value);
    this.adoptionRequestFormHasBeenSubmitted = true;
  }
}
