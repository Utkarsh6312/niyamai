import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8000/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get("refresh") === "true";

  try {
    const res = await fetch(`${BACKEND}/feed/all?refresh=${refresh}`, {
      next: { revalidate: refresh ? 0 : 1800 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data, {
          headers: { "Cache-Control": "public, max-age=1800, stale-while-revalidate=300" },
        });
      }
    }
  } catch {
    // Backend offline, fallback below
  }

  // Combine fallback responses from local rbi & news routes if backend is down
  try {
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const [rbiRes, newsRes] = await Promise.all([
      fetch(`${protocol}://${host}/api/feed/rbi`, { cache: "no-store" }),
      fetch(`${protocol}://${host}/api/feed/news`, { cache: "no-store" }),
    ]);
    const rbiData = rbiRes.ok ? await rbiRes.json() : [];
    const newsData = newsRes.ok ? await newsRes.json() : [];
    const combined = [...rbiData, ...newsData];
    combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return NextResponse.json(combined);
  } catch {
    return NextResponse.json([]);
  }
}
