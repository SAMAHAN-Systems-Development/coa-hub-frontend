import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: User;
    accessToken?: string;
    error?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
    isAdmin: boolean;
    adminRole?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: {
      id: string | number;
      email: string;
      name: string;
      picture?: string;
      isAdmin: boolean;
      adminRole?: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // Restrict to your domain
          hd: "addu.edu.ph",
        },
      },
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Login failed:", errorData);
            return null;
          }

          const data = await response.json();

          // Return user object with tokens from backend
          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.name,
            picture: data.user.picture,
            isAdmin: data.user.isAdmin,
            adminRole: data.user.adminRole,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
          };
        } catch (error) {
          console.error("Admin login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // Only allow @addu.edu.ph emails
      if (account?.provider === "google") {
        const email = profile?.email || "";
        if (!email.endsWith("@addu.edu.ph")) {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account, user, trigger }) {
      // Initial sign in
      if (account && user) {
        // Handle Google OAuth
        if (account.provider === "google") {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                googleAccessToken: account.access_token,
                googleIdToken: account.id_token,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              console.error("Backend authentication failed:", errorData);
              return {
                ...token,
                error: errorData.message || "BackendAuthError",
              };
            }

            const data = await response.json();

            return {
              ...token,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              accessTokenExpires: Date.now() + (data.expiresIn || 3600) * 1000,
              user: data.user,
            };
          } catch (error) {
            console.error("Backend authentication error:", error);
            return {
              ...token,
              error: "BackendAuthError",
            };
          }
        }

        // Handle Credentials (admin login) - tokens already in user object
        if (account.provider === "credentials") {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpires: Date.now() + (user.expiresIn || 900) * 1000, // Use backend expiresIn
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              picture: user.picture,
              isAdmin: user.isAdmin,
              adminRole: user.adminRole,
            },
          };
        }
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          id: typeof token.user.id === 'string' ? token.user.id : token.user.id.toString(),
          email: token.user.email,
          name: token.user.name,
          picture: token.user.picture,
          isAdmin: token.user.isAdmin,
          adminRole: token.user.adminRole,
        };
      }

      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as string | undefined;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
});

/**
 * Refresh token mutex to prevent concurrent refresh attempts
 */
let refreshPromise: Promise<any> | null = null;

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(token: any) {
  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      console.log("Attempting refresh with token:", token.refreshToken ? "present" : "MISSING");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.refreshToken}`,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Refresh failed:", response.status, errorBody);
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const data = await response.json();

      return {
        ...token,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || token.refreshToken,
        accessTokenExpires: Date.now() + (data.expiresIn || 3600) * 1000,
      };
    } catch (error) {
      console.error("Token refresh error:", error);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
