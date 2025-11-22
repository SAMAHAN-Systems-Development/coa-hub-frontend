/**
 * Auth-related type definitions
 * Note: Most auth is now handled by NextAuth, but keeping minimal types for backend integration
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
    isAdmin: boolean;
    adminRole?: string;
  };
}

export interface GoogleAuthRequest {
  googleAccessToken: string;
  googleIdToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
