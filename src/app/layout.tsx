import type React from "react";
import { Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { BackendHealthCheck } from "@/providers/BackendHealthCheck";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${bebasNeue.variable} antialiased`}
    >
      <body>
        <SessionProvider>
          <QueryProvider>
            <BackendHealthCheck>
              {children}
              <Toaster />
            </BackendHealthCheck>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
