"use server";

import { revalidatePath } from "next/cache";
import { categorySchema } from "../schemas/category.schema";
import { getSession } from "@/lib/auth/get-session";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import {
  findCategoryByName,
  findCategoryByNameExcluding,
  createCategory,
  updateCategory,
  findCategoryWithEventCount,
  deleteCategory,
} from "../services/category-admin.service";

export async function createCategoryAction(formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };
    // EDITOR role shouldn't create categories typically, but let's allow ADMIN/SUPER_ADMIN
    if (session.role === "EDITOR") return { error: "Forbidden: Editors cannot create categories" };

    const name = formData.get("name") as string;
    
    const validatedFields = categorySchema.safeParse({ name });
    if (!validatedFields.success) {
      return { error: validatedFields.error.issues[0].message };
    }

    // Check if exists
    const existing = await findCategoryByName(validatedFields.data.name);

    if (existing) {
      return { error: "Category with this name already exists" };
    }

    const category = await createCategory(validatedFields.data.name);

    // Audit log
    writeAuditLog({
      userId: session.id,
      action: "create",
      entityType: "category",
      entityId: category.id,
      metadata: { name: category.name }
    });

    revalidatePath("/en/admin/categories");
    revalidatePath("/id/admin/categories");
    
    return { success: true, category };
  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }
}

export async function updateCategoryAction(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };
    if (session.role === "EDITOR") return { error: "Forbidden: Editors cannot edit categories" };

    const name = formData.get("name") as string;
    
    const validatedFields = categorySchema.safeParse({ name });
    if (!validatedFields.success) {
      return { error: validatedFields.error.issues[0].message };
    }

    // Check if new name conflicts with another category
    const existing = await findCategoryByNameExcluding(validatedFields.data.name, id);

    if (existing) {
      return { error: "Another category with this name already exists" };
    }

    const oldCategory = await findCategoryWithEventCount(id);
    if (!oldCategory) return { error: "Category not found" };

    const category = await updateCategory(id, validatedFields.data.name);

    writeAuditLog({
      userId: session.id,
      action: "update",
      entityType: "category",
      entityId: category.id,
      metadata: { field: "name", old: oldCategory.name, new: category.name }
    });

    revalidatePath("/en/admin/categories");
    revalidatePath("/id/admin/categories");
    
    return { success: true, category };
  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };
    if (session.role === "EDITOR") return { error: "Forbidden: Editors cannot delete categories" };

    // Check if category is used by events
    const category = await findCategoryWithEventCount(id);

    if (!category) return { error: "Category not found" };

    if (category._count.events > 0) {
      return { error: "Cannot delete category because it is currently linked to one or more events." };
    }

    await deleteCategory(id);

    writeAuditLog({
      userId: session.id,
      action: "delete",
      entityType: "category",
      entityId: id,
      metadata: { name: category.name }
    });

    revalidatePath("/en/admin/categories");
    revalidatePath("/id/admin/categories");
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }
}
