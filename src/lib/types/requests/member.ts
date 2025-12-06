export interface CreateMemberRequest {
  name: string;
  position: string;
  email: string;
  categoryId: number;
  imageUrl?: string;
}

export interface UpdateMemberRequest {
  name?: string;
  position?: string;
  email?: string;
  categoryId?: number;
  imageUrl?: string;
}

export interface GetMembersRequest {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
}

export interface CreateMemberCategoryRequest {
  name: string;
}

export interface UpdateMemberCategoryRequest {
  name: string;
}
