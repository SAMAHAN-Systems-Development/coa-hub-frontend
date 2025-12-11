"use client";

import { useEffect, useState } from "react";
import { FullScreenLoader } from "@/components/shared/loading-spinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_RETRIES = 10;
const RETRY_DELAY = 2000; // 2 seconds

export function BackendHealthCheck({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const response = await fetch(`${API_URL}/`, {
          method: "GET",
          cache: "no-store",
        });

        if (!cancelled && response.ok) {
          setIsReady(true);
        } else if (!cancelled) {
          throw new Error(`Backend returned ${response.status}`);
        }
      } catch (err) {
        if (cancelled) return;

        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount((c) => c + 1);
          }, RETRY_DELAY);
        }
      }
    }

    checkHealth();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  if (!isReady) {
    const label = retryCount >= MAX_RETRIES
      ? "Backend is unavailable. Please try again later."
      : "Connecting to server...";

    return <FullScreenLoader label={label} />;
  }

  return <>{children}</>;
}
