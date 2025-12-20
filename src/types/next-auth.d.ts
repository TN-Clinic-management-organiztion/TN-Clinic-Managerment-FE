import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";
import { type JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      username?: string;
      user_type?: "STAFF" | "PATIENT" | "ADMIN";
      role?: string;
      staff_id?: string;
      patient_id?: string;
      assigned_room_id?: number;
      signature_url?: string;
    };
    access_token?: string | null;
    error?: string | null;
  }

  interface User extends DefaultUser {
    id: string;
    username?: string;
    user_type?: "STAFF" | "PATIENT" | "ADMIN";
    role?: string;
    staff_id?: string;
    patient_id?: string;
    assigned_room_id?: number;
    access_token: string;
    refresh_token: string;
    access_token_expires_at?: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      username?: string;
      user_type?: "STAFF" | "PATIENT" | "ADMIN";
      role?: string;
      staff_id?: string;
      patient_id?: string;
      assigned_room_id?: number;
    };
    access_token?: string;
    refresh_token?: string;
    access_token_expires_at?: number | null;
    error?: string;
  }
}
