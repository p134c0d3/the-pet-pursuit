import { DataStorageService } from './../services/data-storage.service';
import { Component } from '@angular/core';
import { NewPost } from '../models/new-post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from '../services/HTTPService';

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
  ) {
    this.editPostForm = this.formBuilder.group({
      id: [''],
      petName: ['', Validators.required],
      petType: ['', Validators.required],
      petBreed: [''],
      petGender: ['', Validators.required],
      petAge: ['', Validators.required],
      spayedNeutered: ['', Validators.required],
      petLocation: ['', Validators.required],
      message: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
      imagePath: [''],
      goodWithChildren: [''],
      housetrained: [''],
      goodWithDogs: [''],
      goodWithCats: [''],
    });
  }

  ngOnInit() {
    this.editPost = false;
    this.fetchPets();
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
    });
  }

  subToPetsArray() {
    this.dataStorage.allPets.subscribe((Pet) => {
      console.log('All Pets', Pet);
    });
  }

  editSinglePost(pet: NewPost) {
    this.openModal = true;
    this.selectedPet = pet;

    this.editPostForm = this.formBuilder.group({
      id: [pet?.id],
      petName: [pet?.petName, Validators.required],
      petType: [pet?.petType, Validators.required],
      petBreed: [pet?.petBreed],
      petGender: [pet?.petGender, Validators.required],
      petAge: [pet?.petAge, Validators.required],
      spayedNeutered: [pet?.spayedNeutered, Validators.required],
      petLocation: [pet?.petLocation, Validators.required],
      message: [pet?.message, Validators.required],
      firstName: [pet?.firstName, Validators.required],
      lastName: [pet?.lastName, Validators.required],
      email: [pet?.email, Validators.required],
      phoneNumber: [pet?.phoneNumber],
      imagePath: [pet?.imagePath],
      goodWithChildren: [pet?.goodWithChildren],
      housetrained: [pet?.housetrained],
      goodWithDogs: [pet?.goodWithDogs],
      goodWithCats: [pet?.goodWithCats],
    });
  }

  onSubmit() {
    this.onSubmitClicked = true;
    if (this.editPostForm.valid) {
      this.dataStorage.storeNewPost(this.editPostForm.value);
      this.editPostForm.reset();
      this.isApplyClicked = false;
      this.openModal = false;
      console.log('form is valid');
    } else {
      console.log('form is not valid');
    }
  }

  onEditSubmit() {
    this.onSubmitClicked = true;
    if (this.editPostForm.valid) {
      const data = this.selectedPet.id;
      console.log(this.editPostForm.value);
      this.dataStorage
        .saveEditedPostToFirebase(data, this.editPostForm.value)
        .subscribe(
          (res) => {
            console.log('Post Edit Successful!', res);
          },
          (error) => {
            console.error('Error editing post.', error);
          }
        );
      this.openModal = false;
      console.log(this.selectedPet);
    }
    this.fetchPets();
  }

  applyButtonClicked(): void {
    this.isApplyClicked = true;
    this.openModal = false;
  }

  onCancel() {
    this.onSubmitClicked = false;
    this.isApplyClicked = false;
    this.editPostForm.reset();
    this.openModal = false;
  }
}
