export interface SubmissionBin {
  id: number;
  name: string;
  fileFormat: string;
  fileName: string;
  createdById: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface CreateSubmissionBinDto {
  name: string;
  fileFormat: string;
  fileName: string;
}

export interface UpdateSubmissionBinDto {
  name?: string;
  fileFormat?: string;
  fileName?: string;
}