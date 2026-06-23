import { NextRequest, NextResponse } from "next/server";

// Dev-only route — renders the confirmation email in the browser
// Visit: http://localhost:3000/api/dev/email-preview

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const { buildConfirmationHtmlForPreview } = await import("@/lib/email");

  // Use the request's own origin so local images resolve correctly
  const origin = `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const html = buildConfirmationHtmlForPreview(
    {
      guest_name: "Rahul Sharma",
      email: "rahul@example.com",
      check_in: "2026-07-15",
      check_out: "2026-07-17",
      package_title: "Nature Retreat — 2 Nights",
      guests: 2,
      id: "abc12345-0000-0000-0000-000000000000",
    },
    origin,
  );

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
