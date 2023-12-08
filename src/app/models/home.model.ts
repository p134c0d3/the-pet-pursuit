export class Pet {
  public name:string;
  public breed:string;
  public img:string;
  public description:string;

  constructor(name:string, breed:string, imagePath:string, desc:string) {
    this.name = name;
    this.breed = breed;
    this.img = imagePath;
    this.description = desc;
  }
}
