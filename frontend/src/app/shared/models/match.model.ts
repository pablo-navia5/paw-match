import { UserProfile } from './user.model';
import { PetResponse } from './pet.model';
import { ShelterProfile } from '../../features/shelter/models/shelter.model';

export type MatchStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface MatchResponse {
  id: number;
  userId: number;
  petId: number;
  matchPercentage: number;
  status: MatchStatus;
  createdAt: string;
  applicant?: UserProfile;
  shelter?: ShelterProfile;
  pet?: PetResponse;
}
