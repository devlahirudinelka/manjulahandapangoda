import { revalidateTag } from "next/cache";
import { INSTAGRAM_TAG } from "@/lib/instagram";

/**
 * Keeps the Instagram token alive. Long-lived tokens last 60 days; refreshing
 * resets that to 60 days. Vercel Cron calls this weekly (see vercel.json) with
 * `Authorization: Bearer $CRON_SECRET`. It also refreshes the cached feed.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return Response.json({ error: "INSTAGRAM_ACCESS_TOKEN is not set" }, { status: 500 });
  }

  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);

  const res = await fetch(url, { cache: "no-store" });
  const body = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: { message?: string };
  };

  if (!res.ok || !body.access_token) {
    console.error("[instagram] token refresh failed", body.error?.message ?? res.status);
    return Response.json(
      { error: body.error?.message ?? `Refresh failed (${res.status})` },
      { status: 502 },
    );
  }

  const tokenChanged = body.access_token !== token;
  if (tokenChanged) {
    // Instagram normally extends the same token. If it ever issues a new one,
    // it must be copied into INSTAGRAM_ACCESS_TOKEN by hand.
    console.warn("[instagram] refresh returned a NEW token – update INSTAGRAM_ACCESS_TOKEN in Vercel");
  }

  revalidateTag(INSTAGRAM_TAG, "max");

  return Response.json({
    ok: true,
    expiresInDays: Math.round((body.expires_in ?? 0) / 86400),
    tokenChanged,
  });
}
