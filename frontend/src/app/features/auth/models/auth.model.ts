export interface UserRegisterRequest {
  name: string;
  email: string;
  preferredSpecies: string;
  minAgePreference: number;
  maxAgePreference: number;
  houseSize: string;
  hasYard: boolean;
  hoursAvailablePerDay: number;
}

export interface ShelterRegisterRequest {
  name: string;
  email: string;
  contactPhone: string;
  address: string;
}

export interface AuthProfile {
  databaseId: number;
  role: string;
}
