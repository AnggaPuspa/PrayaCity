import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Cron job to keep Supabase free-tier database alive.
 * Supabase pauses inactive databases after 7 days.
 * This runs daily via Vercel Cron to prevent that.
 */
export async function GET(request: Request) {
  // Verify the request is from Vercel Cron (not public)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Simple query to keep the DB connection alive
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      message: "Database keep-alive ping successful",
    });
  } catch (error) {
    console.error("[CRON] Keep-alive failed:", error);
    return NextResponse.json(
      { ok: false, error: "Database ping failed" },
      { status: 500 }
    );
  }
}
