export type MemberDesignation = {
  id: number;
  memberId: number;
  binId: number;
  createdAt: string;
  member: {
    id: number;
    name: string;
    position: string;
    email: string;
    imageUrl: string | null;
    categoryId: number;
    category: {
      id: number;
      name: string;
    } | null;
  };
};
