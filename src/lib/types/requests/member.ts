export interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  categoryId: string;
  year: number;
  imageUrl?: string;
}

export interface UpdateMemberRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  categoryId?: string;
  year?: number;
  imageUrl?: string;
}

export interface GetMembersRequest {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  year?: number;
}

export interface CreateMemberCategoryRequest {
  name: string;
}

export interface UpdateMemberCategoryRequest {
  name: string;
}
