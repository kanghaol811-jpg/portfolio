import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "public", "601-pages");

const PAGE_MAP: Record<string, string> = {
  about: "about.html",
  archive: "archive.html",
  "floor-oh": "floor-oh.html",
  "floor-honey": "floor-honey.html",
  "floor-kimini-fureta-tokikara": "floor-kimini-fureta-tokikara.html",
  "floor-gifted": "floor-gifted.html",
  "floor-paradox": "floor-paradox.html",
  "floor-shine": "floor-shine.html",
};

const SLUG_MAP: Record<string, string> = {
  about: "about",
  archive: "archive",
};

const MIME_MAP: Record<string, string> = {
  glb: "model/gltf-binary",
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  woff2: "font/woff2",
  json: "application/json",
  mp4: "video/mp4",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug: slugArray } = await params;
  const slug = slugArray || [];

  // Serve static files from public/ before catch-all route logic
  if (slug.length > 2) {
    const filePath = path.join(process.cwd(), "public", ...slug);
    try {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const ext = path.extname(filePath).slice(1).toLowerCase();
        const contentType = MIME_MAP[ext] || "application/octet-stream";
        const content = fs.readFileSync(filePath);
        return new NextResponse(content, {
          headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" },
        });
      }
    } catch {
      // fall through to page routing
    }
  }

  let key: string;
  if (slug.length === 0) {
    key = "home";
  } else if (slug.length === 1) {
    key = SLUG_MAP[slug[0]] || slug[0];
  } else if (slug.length === 2) {
    key = `${slug[0]}-${slug[1]}`;
  } else {
    return notFound();
  }

  let filePath: string;
  if (key === "home") {
    filePath = path.join(process.cwd(), "public", "601-source.html");
  } else if (PAGE_MAP[key]) {
    filePath = path.join(PAGES_DIR, PAGE_MAP[key]);
  } else {
    return notFound();
  }

  try {
    const html = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch {
    return notFound();
  }
}

function notFound() {
  return new NextResponse("Not Found", { status: 404 });
}
