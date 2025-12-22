export const Roles = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  TECHNICIAN: "TECHNICIAN",
  RECEPTIONIST: "RECEPTIONIST",
  PHARMACIST: "PHARMACIST",
} as const;

export type RoleCode = typeof Roles[keyof typeof Roles];

export function hasRole(userRole?: string, allowed?: string[]) {
  if (!allowed?.length) return true;
  if (!userRole) return false;
  return allowed.includes(userRole);
}
