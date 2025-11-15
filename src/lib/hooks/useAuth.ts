import { useSession } from "next-auth/react";

/**
 * Custom hook to access authentication state and user info
 * Uses NextAuth's useSession under the hood
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isAdmin: session?.user?.isAdmin || false,
    adminRole: session?.user?.adminRole,
    accessToken: session?.accessToken,
  };
}

/**
 * Hook to get the current user
 */
export function useUser() {
  const { data: session } = useSession();
  return session?.user || null;
}

/**
 * Hook to check if user is admin
 */
export function useIsAdmin() {
  const { data: session } = useSession();
  return session?.user?.isAdmin || false;
}
