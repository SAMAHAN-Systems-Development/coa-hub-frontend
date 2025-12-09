"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const GoogleIcon = () => (
  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
  >
    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
    <span className="font-medium">Back</span>
  </button>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Show admin login option only when accessing from /admin routes
  const isAdminLogin = callbackUrl.startsWith("/admin");

  const [loginMode, setLoginMode] = useState<"select" | "google" | "admin">(
    isAdminLogin ? "select" : "google"
  );

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl,
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else if (result?.ok) {
        toast.success("Login successful!");
        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white px-4 py-12"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="w-full max-w-[550px]">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-12">
          <div className="mb-6">
            <Image
              src="/logo-dark.svg"
              alt="COA Logo"
              width={120}
              height={120}
              className="w-30 h-30"
            />
          </div>
          <h1
            className="text-5xl md:text-7xl text-[#2c3e50] tracking-wide"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            COA SUBMISSION HUB
          </h1>
        </div>

        {/* Selection Screen - Only shown for admin routes */}
        {loginMode === "select" && isAdminLogin && (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-8">
              Choose how you want to sign in
            </p>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base border-gray-300 hover:bg-gray-50"
              onClick={() => setLoginMode("google")}
            >
              <GoogleIcon />
              Sign in with Google (@addu.edu.ph)
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base border-gray-300 hover:bg-gray-50"
              onClick={() => setLoginMode("admin")}
            >
              Sign in as Admin
            </Button>
          </div>
        )}

        {/* Google Sign In */}
        {loginMode === "google" && (
          <div className="space-y-6">
            {isAdminLogin && <BackButton onClick={() => setLoginMode("select")} />}

            <div className="text-center mb-8">
              <p className="text-gray-700 mb-2">Sign in with Google</p>
              <p className="text-sm text-gray-500">
                Use your ADDU Google account (@addu.edu.ph)
              </p>
            </div>

            <Button
              type="button"
              className="w-full h-12 text-base bg-[#4a5661] hover:bg-[#3d4854]"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon />
              {isLoading ? "Signing in..." : "Continue with Google"}
            </Button>
          </div>
        )}

        {/* Admin Login */}
        {loginMode === "admin" && (
          <div className="space-y-6">
            <BackButton onClick={() => setLoginMode("select")} />

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-gray-50 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-gray-50 border-gray-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base bg-[#4a5661] hover:bg-[#3d4854]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Log In"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
