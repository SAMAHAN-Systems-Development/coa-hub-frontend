export interface Member {
  id: number;
  name: string;
  position: string;
  email: string;
  categoryId: number;
  imageUrl?: string;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface MemberCategory {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CategoryWithMembers {
  category: string;
  categoryId: number;
  members: Member[];
}
