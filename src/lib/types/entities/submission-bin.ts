export interface SubmissionBin {
  id: number;
  name: string;
  instructions: string;
  createdById: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface CreateSubmissionBinDto {
  name: string;
  instructions: string;
}

export interface UpdateSubmissionBinDto {
  name?: string;
  instructions?: string;
}