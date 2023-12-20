
export class adoptionApplication {
  constructor (
  public appID: string,
  public petName: string,
  public firstName: string,
  public lastName: string,
  public streetNumber: number,
  public streetName: string,
  public city: string,
  public state: string,
  public zipCode: number,
  public phoneNumber: number,
  public email: string,
  public housingType: string,
  public whenHome: string,
  public whenNotHome: string,
  public employment: string,
  public commitment: string,
  public surrender: string,
  public ageCheck: boolean,
  public termsConditions: boolean,
  public hhName?: string[],
  public hhAge?: number[],
  public hhPet?: string[],
  public petType?: string[],
  public petAge?: number[],
  public message?: string,
){
  this.appID = appID;
  this.petName = petName;
  this.firstName = firstName;
  this.lastName = lastName;
  this.streetNumber = streetNumber;
  this.streetName = streetName;
  this.city = city;
  this.state = state;
  this.zipCode = zipCode;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.housingType = housingType;
  this.hhName = hhName;
  this.hhAge = hhAge;
  this.hhPet = hhPet;
  this.petType = petType;
  this.petAge = petAge;
  this.whenHome = whenHome;
  this.whenNotHome = whenNotHome;
  this.employment = employment;
  this.commitment = commitment;
  this.surrender = surrender;
  this.message = message;
  this.ageCheck = ageCheck;
  this.termsConditions = termsConditions;
};

}
