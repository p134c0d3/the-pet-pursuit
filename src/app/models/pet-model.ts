
export class Pet {
  public petName: string;
  public petType: string;
  public petBreed: string;
  public petGender: string;
  public petAge: string;
  public spayedNeutered: string;
  public petDescription: string;
  public imagePath: string;


  constructor (petName: string, petType: string, petBreed: string, petGender: string, petAge: string, spayedNeutered: string, petDescription: string, imagePath: string) {
   this.petName = petName;
   this.petType = petType;
   this.petBreed = petBreed;
   this.petGender = petGender;
   this.petAge = petAge;
   this.spayedNeutered = spayedNeutered;
   this.petDescription = petDescription;
   this.imagePath = imagePath;

  }
}
