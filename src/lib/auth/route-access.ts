import type { RoleCode } from "@/lib/auth/role";
import { Roles } from "@/lib/auth/role";

export const RouteAccess: Array<{
  prefix: string;
  roles?: RoleCode[];
}> = [
  { prefix: "/reception", roles: [Roles.ADMIN, Roles.RECEPTIONIST] },
  { prefix: "/encounters", roles: [Roles.ADMIN, Roles.DOCTOR] },
  { prefix: "/results", roles: [Roles.ADMIN, Roles.TECHNICIAN] },
  { prefix: "/annotations", roles: [Roles.ADMIN, Roles.DOCTOR, Roles.TECHNICIAN] },
];
