export interface UserProfile {
  id: number;
  name: string;
  email: string;
  preferredSpecies: string,
  minAgePreference: number,
  maxAgePreference: number,
  houseSize: string,
  hasYard: boolean,
  hoursAvailablePerDay: number,
  hasPreviousExperience: boolean,
  hasSmallChildren: boolean,
  hasOtherPets: boolean,
  activityLevel: number
}
