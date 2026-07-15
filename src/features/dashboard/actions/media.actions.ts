"use server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/session";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadMedia(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return { error: "Unauthorized" };
    const session = await verifyToken(token);
    if (!session) return { error: "Unauthorized" };

    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) return { error: "No file provided" };
    if (!ALLOWED_TYPES.includes(file.type)) return { error: "Invalid file type. Only JPG, PNG, WEBP, and AVIF are allowed." };
    if (file.size > MAX_SIZE) return { error: "File too large (max 5MB)" };

    const ext = file.name.split(".").pop();
    const filename = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.storage
      .from("media")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return { error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, path: data.path, success: true };
  } catch (error: any) {
    console.error("Upload exception:", error);
    return { error: error.message || "Failed to upload image" };
  }
}

export async function listMedia(folder: string = "") {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return { error: "Unauthorized" };
    const session = await verifyToken(token);
    if (!session) return { error: "Unauthorized" };

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.storage
      .from("media")
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("Supabase List Error:", error);
      return { error: error.message };
    }

    // Filter out directories
    const files = data.filter((f) => f.name !== ".emptyFolderPlaceholder" && f.metadata);

    const filesWithUrls = files.map((file) => {
      const fullPath = folder ? `${folder}/${file.name}` : file.name;
      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(fullPath);
      
      return {
        ...file,
        path: fullPath,
        url: urlData.publicUrl,
      };
    });

    return { files: filesWithUrls };
  } catch (error: any) {
    console.error("List exception:", error);
    return { error: error.message || "Failed to list media" };
  }
}

export async function deleteMedia(path: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return { error: "Unauthorized" };
    const session = await verifyToken(token);
    if (!session) return { error: "Unauthorized" };
    
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.storage
      .from("media")
      .remove([path]);

    if (error) {
      console.error("Supabase Delete Error:", error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Delete exception:", error);
    return { error: error.message || "Failed to delete media" };
  }
}
