"use server";

import { cookies } from "next/headers";
import { loginSchema } from "../schemas/auth.schema";
import { redirect } from "next/navigation";
import type { AuthFormState } from "../types";
import { generateToken } from "@/lib/auth/session";
import { findAdminUserByEmail, verifyAdminUserPassword } from "../services/admin-user.service";

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const errors: AuthFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Invalid input", errors };
  }

  const { email, password } = parsed.data;

  // 1. Find user in the database
  const user = await findAdminUserByEmail(email);

  if (!user) {
    return { status: "error", message: "Invalid email or password" };
  }

  // 2. Verify password
  const isValidPassword = await verifyAdminUserPassword(password, user.password);

  if (!isValidPassword) {
    return { status: "error", message: "Invalid email or password" };
  }

  // 3. Generate JWT Token
  const token = await generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  // 4. Set HttpOnly Cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Redirect to admin dashboard on success
  redirect("/en/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  
  redirect("/en/admin/login");
}
