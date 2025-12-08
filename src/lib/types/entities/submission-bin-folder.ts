export interface SubmissionBinFolder {
  id: number;
  binId: number;
  folderName: string;
  gdriveLink: string;
  createdById: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface CreateSubmissionBinFolderDto {
  binId: number;
  folderName: string;
  gdriveLink: string;
}

export interface UpdateSubmissionBinFolderDto {
  binId?: number;
  folderName?: string;
  gdriveLink?: string;
}