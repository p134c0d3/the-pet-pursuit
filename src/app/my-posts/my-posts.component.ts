import { DataStorageService } from './../services/data-storage.service';
import { Component } from '@angular/core';
import { NewPost } from '../models/new-post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from '../services/HTTPService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent {
  editPost = false;
  pets: NewPost[] = [];
  openModal = false;
  isApplyClicked = false;
  onSubmitClicked = false;
  selectedPet: NewPost = null;
  editPostForm: FormGroup;

  constructor(
    private httpService: HTTPService,
    private dataStorage: DataStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editPost = false;
    this.fetchPets();

    this.editPostForm = this.formBuilder.group({
      id: ['id'],
      petName: [this.selectedPet?.petName, Validators.required],
      petType: [this.selectedPet?.petType, Validators.required],
      petBreed: [this.selectedPet?.petBreed],
      petGender: [this.selectedPet?.petGender, Validators.required],
      petAge: [this.selectedPet?.petAge, Validators.required],
      spayedNeutered: [this.selectedPet?.spayedNeutered, Validators.required],
      petLocation: [this.selectedPet?.petLocation, Validators.required],
      message: [this.selectedPet?.message, Validators.required],
      firstName: [this.selectedPet?.firstName, Validators.required],
      lastName: [this.selectedPet?.lastName, Validators.required],
      email: [this.selectedPet?.email, Validators.required],
      phoneNumber: [this.selectedPet?.phoneNumber],
      imagePath: [this.selectedPet?.imagePath],
      goodWithChildren: [this.selectedPet?.goodWithChildren],
      housetrained: [this.selectedPet?.housetrained],
      goodWithDogs: [this.selectedPet?.goodWithDogs],
      goodWithCats: [this.selectedPet?.goodWithCats],
    });
    console.log('Edit Post Form', this.editPostForm);
  }

  deleteSinglePost() {}

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
      console.log('Fetch Pets', this.pets);
    });
  }

  subToPetsArray() {
    this.dataStorage.allPets.subscribe((Pet) => {
      console.log('All Pets', Pet);
    });
  }

  editSinglePost(pet: any) {
    // this.editPost = true;
    this.openModal = true;
    this.selectedPet = pet;
    
    // this.router.navigate(['my-posts-edit']);
  }

  onSubmit() {
    this.onSubmitClicked = true;
    if (this.editPostForm.valid) {
      this.httpService.saveApplicationsToFirebase(this.editPostForm.value);
      this.editPostForm.reset();
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

  onCancel() {
    this.onSubmitClicked = false;
    this.isApplyClicked = false;
    this.editPostForm.reset();
  }
}
