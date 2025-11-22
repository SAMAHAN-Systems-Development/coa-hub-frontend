'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
}

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to COA Hub</h1>
        <p className="text-muted-foreground">
          Hello, {user?.email}
        </p>
      </div>


        {user?.isAdmin && (
          <div className="p-6 border rounded-lg bg-primary/5">
            <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Access admin tools and management features
            </p>
            <Link
              href="/admin"
              className="text-sm text-primary hover:underline font-semibold"
            >
              Go to Admin
            </Link>
          </div>
        )}
      </div>
  );
}
