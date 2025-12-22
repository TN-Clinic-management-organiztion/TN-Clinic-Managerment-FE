// hooks/useLogout.ts

import { useState } from "react";
import { signOut } from "next-auth/react";
import { postLogout } from "@/services/auth";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await postLogout();
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
      
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
  };
}