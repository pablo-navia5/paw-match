export interface PetResponse {
  id: number;
  name: string;
  species: string;
  age: number;
  status: string;
  needsYard: boolean;
  requiredHouseSize: string;
  requiredHoursPerDay: number;
  requiresExperiencedOwner: boolean;
  goodWithChildren: boolean;
  goodWithOtherPets: boolean;
  energyLevel: number;
  image: string;
}
