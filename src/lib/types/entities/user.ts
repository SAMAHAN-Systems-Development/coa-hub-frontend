export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
  adminRole?: string;
  isGoogleUser: boolean;
  lastLoginAt?: string;
  createdAt: string;
}
