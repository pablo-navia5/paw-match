import { UserProfile } from './user.model';
import { PetResponse } from './pet.model';

export type MatchStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface MatchResponse {
  id: number;
  userId: number;
  petId: number;
  matchPercentage: number;
  status: MatchStatus;
  createdAt: string;
  applicant?: UserProfile;
  pet?: PetResponse;
}
