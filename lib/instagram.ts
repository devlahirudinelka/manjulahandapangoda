import { cacheLife, cacheTag } from "next/cache";

/**
 * Latest posts from the studio's Instagram account, via the official
 * Instagram API (Instagram Login). Needs INSTAGRAM_ACCESS_TOKEN: a long-lived
 * token for the Instagram professional account (see README).
 *
 * The result is cached for about an hour and tagged "instagram", so a post
 * shows up on the site within the hour. Returns null when no token is set or
 * Instagram is unreachable, and the grid then falls back to studio photos.
 */
export type InstagramPost = {
  id: string;
  permalink: string;
  image: string;
  caption: string;
  isVideo: boolean;
  timestamp: string;
};

type ApiMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export const INSTAGRAM_TAG = "instagram";

export async function getInstagramPosts(limit = 12): Promise<InstagramPost[] | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(INSTAGRAM_TAG);

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
  );
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.error(`[instagram] feed request failed: ${res.status} ${await res.text()}`);
      return null;
    }
    const json = (await res.json()) as { data?: ApiMedia[] };
    const posts = (json.data ?? [])
      .map((m): InstagramPost | null => {
        const image = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
        if (!image) return null;
        return {
          id: m.id,
          permalink: m.permalink,
          image,
          caption: m.caption ?? "",
          isVideo: m.media_type === "VIDEO",
          timestamp: m.timestamp,
        };
      })
      .filter((p): p is InstagramPost => p !== null);
    return posts.length ? posts : null;
  } catch (err) {
    console.error("[instagram] feed request error", err);
    return null;
  }
}
