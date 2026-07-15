import { AdminRole } from "@/generated/prisma";

export function can(
  role: AdminRole,
  action: "create" | "update" | "delete" | "publish" | "manage_admins"
): boolean {
  const permissions: Record<AdminRole, string[]> = {
    SUPER_ADMIN: ["create", "update", "delete", "publish", "manage_admins"],
    ADMIN: ["create", "update", "delete", "publish"],
    EDITOR: ["create", "update"],
  };
  return permissions[role]?.includes(action) ?? false;
}

export type AuthFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

export const initialAuthFormState: AuthFormState = {
  status: "idle",
  message: "",
};
