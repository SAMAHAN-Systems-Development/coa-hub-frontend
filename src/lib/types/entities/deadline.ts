export interface Deadline {
  id: number;
  name: string;
  dueDate: string;
  createdById: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface CreateDeadlineDto {
  name: string;
  dueDate: string;
}

export interface UpdateDeadlineDto {
  name?: string;
  dueDate?: string;
}