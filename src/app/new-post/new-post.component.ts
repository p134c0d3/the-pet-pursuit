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

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  isApplyClicked = false;
  newPostForm: FormGroup;
  newPostFormHasBeenSubmitted = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder
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

    const genID = this.generateID();
    const newPost = new NewPost(
      genID,
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

    this.router.navigate(['home']);
  }

  generateID(): number {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  onCancel() {
    this.router.navigate(['home']);
  }
}
