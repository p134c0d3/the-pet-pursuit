export class Pet {
  public name: string;
  public breed: string;
  public imagePath: string;
  public description: string;

  constructor(name: string, breed: string, imagePath: string, desc: string) {
    this.name = name;
    this.breed = breed;
    this.imagePath = imagePath;
    this.description = desc;
  }
}
