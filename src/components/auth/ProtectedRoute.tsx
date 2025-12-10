'use client';

import { useAuth } from '@/lib/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute - UI wrapper only
 * Middleware handles all redirects - this component only handles UI states
 * DO NOT add router.push() here to avoid redirect loops
 */
export default function ProtectedRoute({
  children,
  requireAdmin = false
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated - middleware will redirect, just show nothing
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated but not admin when admin required
  if (requireAdmin && !user?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
