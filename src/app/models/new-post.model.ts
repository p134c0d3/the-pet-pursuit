export class NewPost {
    public id: number;
     public petName: string;
     public petType: string;
     public petBreed: string;
     public petGender: string;
     public petAge: string;
     public spayedNeutered: string;
     public petLocation: string;
     public message: string;
     public firstName: string;
     public lastName: string;
     public email: string;
     public phoneNumber: string;
     public imagePath: string;
     public goodWithChildren: boolean;
     public housetrained: boolean;
     public goodWithDogs: boolean;
     public goodWithCats: boolean;

     constructor (id: number, petName: string, petType: string, petBreed: string, petGender: string, petAge: string, spayedNeutered: string, petLocation: string, message: string, firstName: string, lastName: string, email: string, phoneNumber: string, imagePath: string, goodWithChildren: boolean, housetrained: boolean, goodWithDogs: boolean, goodWithCats: boolean) {
      this.id = id;
      this.petName = petName;
      this.petType = petType;
      this.petBreed = petBreed;
      this.petGender = petGender;
      this.petAge = petAge;
      this.spayedNeutered = spayedNeutered;
      this.petLocation = petLocation;
      this.message = message;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.imagePath = imagePath;
      this.goodWithChildren = goodWithChildren;
      this.housetrained = housetrained;
      this.goodWithDogs = goodWithDogs;
      this.goodWithCats = goodWithCats;
     }
}
