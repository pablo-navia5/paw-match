export interface PetResponse {
  id: number;
  name: string;
  species: string;
  age: number;
  status: string;
  requiredHoursPerDay: boolean;
  requiresExperiencedOwner: boolean;
  goodWithChildren: boolean;
  goodWithOtherPets: boolean;
  energyLevel: number;
  // imageUrl: string;
}
