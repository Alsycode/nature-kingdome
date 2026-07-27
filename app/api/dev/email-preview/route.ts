import { NextRequest, NextResponse } from "next/server";

// Dev-only route — renders the booking emails in the browser
// Guest email: http://localhost:3000/api/dev/email-preview
// Admin email: http://localhost:3000/api/dev/email-preview?type=admin

// One fixture for both emails, so the booking reference shown to the guest and
// the one shown to the host can be compared side by side.
const SAMPLE_BOOKING = {
  guest_name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
  check_in: "2026-07-15",
  check_out: "2026-07-17",
  package_title: "Nature Retreat — 2 Nights",
  guests: 2,
  id: "abc12345-0000-0000-0000-000000000000",
};

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const { buildConfirmationHtmlForPreview, buildClientNotificationHtml } = await import("@/lib/email");

  const html =
    req.nextUrl.searchParams.get("type") === "admin"
      ? buildClientNotificationHtml(SAMPLE_BOOKING)
      : // Use the request's own origin so local images resolve correctly
        buildConfirmationHtmlForPreview(
          SAMPLE_BOOKING,
          `${req.nextUrl.protocol}//${req.nextUrl.host}`,
        );

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
