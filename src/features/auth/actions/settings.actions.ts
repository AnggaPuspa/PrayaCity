"use server";

import { cookies } from "next/headers";
import { getSession } from "@/lib/auth/get-session";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { profileSchema, passwordSchema } from "../schemas/settings.schema";
import {
  findAdminUserById,
  updateAdminUserProfile,
  updateAdminUserPassword,
  verifyAdminUserPassword,
  hashPassword,
} from "../services/admin-user.service";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session || !session.id) return { error: "Unauthorized" };

    const fullName = formData.get("fullName") as string;
    
    const validatedFields = profileSchema.safeParse({ fullName });
    if (!validatedFields.success) {
      return { error: validatedFields.error.issues[0].message };
    }

    const user = await findAdminUserById(session.id);
    if (!user) return { error: "User not found" };

    await updateAdminUserProfile(session.id, { fullName });

    await writeAuditLog({
      userId: session.id,
      action: "update",
      entityType: "auth",
      entityId: session.id,
      metadata: { field: "fullName", old: user.fullName, new: fullName }
    });

    revalidatePath("/admin/settings");
    revalidatePath("/admin");

    return { success: true, message: "Profile updated successfully" };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function changePasswordAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session || !session.id) return { error: "Unauthorized" };

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    const validatedFields = passwordSchema.safeParse({ 
      currentPassword, 
      newPassword, 
      confirmPassword 
    });
    
    if (!validatedFields.success) {
      return { error: validatedFields.error.issues[0].message };
    }

    const user = await findAdminUserById(session.id);
    if (!user) return { error: "User not found" };

    const isMatch = await verifyAdminUserPassword(currentPassword, user.password);
    if (!isMatch) {
      return { error: "Incorrect current password" };
    }

    const hashedPassword = await hashPassword(newPassword);
    await updateAdminUserPassword(session.id, hashedPassword);

    await writeAuditLog({
      userId: session.id,
      action: "update",
      entityType: "auth",
      entityId: session.id,
      metadata: { field: "password", old: "***", new: "***" }
    });

    return { success: true, message: "Password changed successfully" };
  } catch (error: any) {
    console.error("Change password error:", error);
    return { error: "Failed to change password" };
  }
}
