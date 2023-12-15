export class NewPost {
    public id: number;
     public petName: string;
     public petType: string;
     public petBreed: string;
     public petGender: string;
     public age: string;
     public spayedNeutered: string;
     public petLocation: string;
     public petDescription: string;
     public message: string;
     public firstName: string;
     public lastName: string;
     public email: string;
     public phoneNumber: string;

     constructor (id: number, petName: string, petType: string, petBreed: string, petGender: string, age: string, spayedNeutered: string, petLocation: string, petDescription: string, message: string, firstName: string, lastName: string, email: string, phoneNumber: string) {
      this.id = id;
      this.petName = petName;
      this.petType = petType;
      this.petBreed = petBreed;
      this.petGender = petGender;
      this.age = age;
      this.spayedNeutered = spayedNeutered;
      this.petLocation = petLocation;
      this.petDescription = petDescription;
      this.message = message;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
     }
}
