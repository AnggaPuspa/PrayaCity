"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file uploaded" };

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, file);

  if (error) {
    return { error: error.message };
  }

  const { data: publicUrlData } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return { url: publicUrlData.publicUrl };
}
