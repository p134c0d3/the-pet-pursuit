import { DataStorageService } from './../services/data-storage.service';
import { Component } from '@angular/core';
import { NewPost } from '../models/new-post.model';
import { FormGroup } from '@angular/forms';
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
  adoptionRequestForm: FormGroup;
  onSubmitClicked = false;
  selectedPet: NewPost = null;

  constructor(
    private router: Router,
    private httpService: HTTPService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
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
      console.log('Fetch Pets', this.pets);
    });
  }

  subToPetsArray() {
    this.dataStorage.allPets.subscribe((Pet) => {
      console.log('All Pets', Pet);
    });
  }

  editSinglePost(pet: any) {
    this.editPost = true;
    this.openModal = true;
    this.selectedPet = pet;
    this.adoptionRequestForm.patchValue({ petName: this.selectedPet.petName });
    this.router.navigate(['my-posts-edit']);
  }

  onSubmit() {
    this.onSubmitClicked = true;
    if (this.adoptionRequestForm.valid) {
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

  onCancel() {
    this.onSubmitClicked = false;
    this.isApplyClicked = false;
    this.adoptionRequestForm.reset();
  }
}
