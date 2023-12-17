import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pet } from '../models/pet-model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  petChanged = new Subject<Pet[]>();

  private pets: Pet[] = [
   
  ];

  constructor() { }

  // to get a list of all pets
  getPets() {
    return this.pets.slice();
  }

  // to get a pet with id index
  getPet(index: number) {
    return this.pets[index];
  }

  // to add a new pet
  addPet(pet: Pet) {
    this.pets.push(pet)
    this.petChanged.next(this.pets.slice());
  }

  // to update pet information
  updatePet(index: number, newPet: Pet) {
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
