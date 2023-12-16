export class Pet {
  public petName: string;
  public petType?: string;
  public petBreed: string;
  public petGender?: string;
  public petAge?: string;
  public spayedNeutered?: string;
  public message: string;
  public imagePath: string;
  

  constructor(
    petName: string,
    imagePath: string,
    petBreed: string,
    message: string,
    petGender?: string,
    petAge?: string,
    spayedNeutered?: string,
    petType?: string
  ) {
    this.petName = petName;
    this.petType = petType;
    this.petBreed = petBreed;
    this.petGender = petGender;
    this.petAge = petAge;
    this.spayedNeutered = spayedNeutered;
    this.message = message;
    this.imagePath = imagePath;
  }
}
