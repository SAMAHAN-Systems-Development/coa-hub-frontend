'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Home() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
}

function HomePage() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="container mx-auto px-6 py-16">

        {/* User Info Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 font-bebas tracking-wide">
              Your Account
            </h2>
            <div className="space-y-3 font-montserrat">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-900">{user?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-900">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-600">Account Type:</span>
                {isAdmin ? (
                  <span className="px-3 py-1 bg-gradient-to-br from-[#373C44] to-[#49515A] text-white text-sm rounded font-bold">
                    ADMIN
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-semibold">
                    USER
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
  );
}
