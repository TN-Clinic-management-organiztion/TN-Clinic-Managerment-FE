// src/lib/http/server.ts
import { auth } from "@/lib/auth/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export async function apiFetch(path: string, init: RequestInit = {}) {
  const session = await auth();
  const accessToken = (session as any)?.access_token;

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return res;
}
