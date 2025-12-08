export interface CreateCategoryRequest {
  name: string;
  priority_number?: number;
}

export interface UpdateCategoryRequest {
  name?: string;
  priority_number?: number;
}
