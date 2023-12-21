import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { NewPost } from '../models/new-post.model';
import { v4 as uuidv4 } from 'uuid';
import { Observable, from, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  isApplyClicked = false;
  newPostForm: FormGroup;
  newPostFormHasBeenSubmitted = false;
  openModal = false;
  genID: number;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.newPostForm = this.formBuilder.group({
      id: ['id'],
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
      termsConditions: ['', Validators.required],
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.newPostForm.reset();
  }

  onSubmit() {
    const {
      petName,
      petType,
      petBreed,
      petGender,
      petAge,
      spayedNeutered,
      petLocation,
      message,
      firstName,
      lastName,
      email,
      phoneNumber,
      imagePath,
      goodWithChildren,
      housetrained,
      goodWithDogs,
      goodWithCats,
    } = this.newPostForm.value;

    const newPost = new NewPost(
      this.genID = uuidv4(),
      petName,
      petType,
      petBreed,
      petGender,
      petAge,
      spayedNeutered,
      petLocation,
      message,
      firstName,
      lastName,
      email,
      phoneNumber,
      imagePath,
      goodWithChildren,
      housetrained,
      goodWithDogs,
      goodWithCats
    );

    console.log(this.newPostForm.value);
    this.newPostFormHasBeenSubmitted = true;
    this.dataStorageService.storeNewPost(newPost);

    this.dataStorageService.fetchPets();
    this.router.navigate(['home']);

    // location.reload();
  }

  trimPetBreed(breed) {
    return breed.replaceAll(' ', '');
  }
  generateID(): number {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  onCancel() {
    this.router.navigate(['home']);
  }

  openTermsConditions() {
    this.openModal = true;
  }
}
