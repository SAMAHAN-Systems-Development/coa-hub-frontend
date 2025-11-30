export interface Template {
  id: number;
  name: string;
  gdriveLink: string;
  createdById: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface CreateTemplateDto {
  name: string;
  gdriveLink: string;
}

export interface UpdateTemplateDto {
  name?: string;
  gdriveLink?: string;
}