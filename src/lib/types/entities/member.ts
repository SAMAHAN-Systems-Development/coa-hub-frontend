export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  categoryId: string;
  year: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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
