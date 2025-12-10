"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export function SessionProvider({
  children,
  session,  
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <NextAuthSessionProvider
      session={session}
      refetchInterval={0} // Disable automatic session polling
      refetchOnWindowFocus={false} // Don't refetch on window focus
      refetchWhenOffline={false} // Don't refetch when offline
    >
      {children}
    </NextAuthSessionProvider>
  );
}
