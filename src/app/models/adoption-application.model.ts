export interface adoptionApplication {
  petName: string;
  firstName: string;
  lastName: string;
  streetNumber: number;
  streetName: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: number;
  email: string;
  housingType: string;
  hhName: string[];
  hhAge: number[];
  hhPet: string[];
  petType: string[];
  petAge: number[];
  whenHome: string;
  whenNotHome: string;
  employment: string;
  commitment: string;
  surrender: string;
  message: string;
  ageCheck: boolean;
  termsConditions: boolean;
}
