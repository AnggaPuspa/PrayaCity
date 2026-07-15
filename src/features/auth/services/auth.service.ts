// Re-export from the canonical cross-cutting location.
// Internal feature code may still import from here; external consumers should
// prefer `@/lib/auth/session` directly.
export { generateToken, verifyToken } from "@/lib/auth/session";
export type { SessionPayload } from "@/lib/auth/session";
