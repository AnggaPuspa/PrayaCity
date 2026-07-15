import { cookies } from "next/headers";
import { verifyToken, type SessionPayload } from "./session";

/**
 * Reads the admin session cookie and verifies the JWT.
 * Returns the session payload or null if unauthenticated.
 *
 * This is a cross-cutting helper used by multiple feature actions.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return await verifyToken(token);
}
