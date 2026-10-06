export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;

  hasYard?: boolean;
  hoursAvailablePerDay?: number;
  houseSize?: string;
  hasPreviousExperience?: boolean;
  hasSmallChildren?: boolean;
  hasOtherPets?: boolean;
  activityLevel?: number;
}
