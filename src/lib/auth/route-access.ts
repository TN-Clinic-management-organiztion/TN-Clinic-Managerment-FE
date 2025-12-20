import type { RoleCode } from "@/lib/auth/role";
import { Roles } from "@/lib/auth/role";

export const RouteAccess: Array<{
  prefix: string;
  roles?: RoleCode[]; // undefined => chỉ cần login
}> = [
  { prefix: "/dashboard" },
  { prefix: "/reception", roles: [Roles.ADMIN, Roles.RECEPTIONIST] },
  { prefix: "/encounters", roles: [Roles.ADMIN, Roles.DOCTOR] },
  { prefix: "/patients", roles: [Roles.ADMIN, Roles.RECEPTIONIST, Roles.DOCTOR] },
  { prefix: "/staff", roles: [Roles.ADMIN] },
  { prefix: "/services", roles: [Roles.ADMIN] },
  { prefix: "/results", roles: [Roles.ADMIN, Roles.TECHNICIAN] },
  { prefix: "/annotations", roles: [Roles.ADMIN, Roles.DOCTOR, Roles.TECHNICIAN] },
  { prefix: "/invoices", roles: [Roles.ADMIN, Roles.RECEPTIONIST] },
];
