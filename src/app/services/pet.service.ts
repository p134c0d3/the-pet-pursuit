import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { NewPost } from '../models/new-post.model';

@Injectable()
export class PetService {
  petChanged = new Subject<NewPost[]>();

  private pets: NewPost[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private petService: PetService
  ) {}


  setPets(pets: NewPost[]) {
    this.pets = pets;
    this.petChanged.next(this.pets.slice());
  }

  // to get a list of all pets
  getPets() {
    return this.pets.slice();
  }

  // to get a pet with id index
  getPet(index: number) {
    return this.pets[index];
  }

  // to add a new pet
  addPet(pet: NewPost) {

    this.pets.push(pet);

    this.petChanged.next(this.pets.slice());
  }

  // to update pet information
  updatePet(index: number, newPet: NewPost) {
    this.pets[index] = newPet;
    this.petChanged.next(this.pets.slice());
  }

  // to delete pet
  deletePet(index: number) {
    this.pets.splice(index, 1);
    this.petChanged.next(this.pets.slice());
  }
}

// public petName: string;
// public petType: string;
// public petBreed: string;
// public petGender: string;
// public age: string;
// public spayedNeutered: string;
// public petDescription: string;
