import { Resend } from "resend";
import { bookingRef } from "./bookingRef";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM =
  process.env.NODE_ENV === "production"
    ? "Nature Kingdom Homestay <bookings@naturekingdomhomestay.com>"
    : "Nature Kingdom Homestay <onboarding@resend.dev>";

const CLIENT_EMAIL =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_EMAIL!
    : (process.env.RESEND_TEST_EMAIL ?? process.env.CLIENT_EMAIL!);

const WHATSAPP = process.env.NEXT_PUBLIC_CLIENT_WHATSAPP!;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://naturekingdomhomestay.com";

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Confirmation email HTML ─────────────────────────────────────────────────

export function buildConfirmationHtmlForPreview(
  booking: {
    guest_name: string;
    email: string;
    check_in: string;
    check_out: string;
    package_title: string;
    guests: number;
    id: string;
    total_amount?: number | null;
  },
  siteUrlOverride?: string,
): string {
  return buildConfirmationHtml(booking, siteUrlOverride);
}

function buildConfirmationHtml(
  booking: {
    guest_name: string;
    check_in: string;
    check_out: string;
    package_title: string;
    guests: number;
    id: string;
    total_amount?: number | null;
  },
  siteUrlOverride?: string,
): string {
  const siteUrl =
    siteUrlOverride ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://naturekingdomhomestay.com";
  const ref = bookingRef(booking.id);

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your stay at Nature Kingdom Homestay is confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background-color:#0a0a0a;padding:32px 16px;">
  <tr><td align="center">

  <!-- ── Main container ── -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
    style="max-width:600px;width:100%;background-color:#121212;border:1px solid #222222;">

    <!-- ── HEADER ── -->
    <tr>
      <td align="center" style="padding:28px 32px 22px;border-bottom:1px solid #222222;background-color:#1a1209;">
        <img src="https://res.cloudinary.com/ds05t0bd0/image/upload/v1782096401/ChatGPT_Image_Jun_22__2026__08_05_09_AM-removebg-preview_irqsap.png" alt="Nature Kingdom Homestay" width="150"
          style="display:block;margin:0 auto 8px;width:150px;height:auto;" />
        <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:0.2em;color:#c8a97e;text-transform:uppercase;">Chikmagalur &middot; Karnataka</p>
      </td>
    </tr>

    <!-- ── HERO (split) ── -->
    <tr>
      <td style="padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <!-- Left: headline -->
            <td width="52%" valign="top"
              style="padding:40px 24px 36px 32px;background-color:#0e0e0e;vertical-align:top;">
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:9px;
                letter-spacing:0.3em;color:#c8a97e;text-transform:uppercase;">
                WHISPERS FROM THE SANCTUARY
              </p>
              <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;
                font-size:30px;line-height:1.14;color:#F4E7D6;font-weight:400;">
                We&#8217;re glad<br />you&#8217;re<br />coming.
              </h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;
                line-height:1.8;color:#847e6e;">
                Your escape into nature, stillness, and timeless moments awaits.
              </p>
            </td>
            <!-- Right: image as background fill -->
            <td width="48%" valign="top"
              style="padding:0;vertical-align:top;
                background-image:url('https://res.cloudinary.com/ds05t0bd0/image/upload/v1782097068/ChatGPT_Image_May_31_2026_05_34_41_PM_yablhb.png');
                background-size:cover;background-position:center;
                min-height:240px;height:240px;">
              <!-- spacer so the cell has height -->
              <img src="https://placehold.co/1x240/000/000/png" width="1" height="240"
                style="display:block;width:1px;height:240px;opacity:0;" alt="" />
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── DIVIDER ── -->
    <tr><td style="height:1px;background-color:#222222;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- ── DEAR TRAVELER ── -->
    <tr>
      <td style="padding:40px 32px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-left:2px solid #c8a97e;padding-left:22px;">
              <h2 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;
                font-size:22px;color:#F4E7D6;font-weight:400;">
                Dear ${booking.guest_name},
              </h2>
              <p style="margin:0 0 13px;font-family:Arial,Helvetica,sans-serif;font-size:13px;
                line-height:1.85;color:#847e6e;">
                Thank you for choosing Nature Kingdom Homestay.
              </p>
              <p style="margin:0 0 13px;font-family:Arial,Helvetica,sans-serif;font-size:13px;
                line-height:1.85;color:#847e6e;">
                We&#8217;re honoured to be part of your journey and can&#8217;t wait to welcome you
                to the coffee hills of Chikmagalur.
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;
                line-height:1.85;color:#847e6e;">
                Here&#8217;s a summary of your confirmed stay.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── BOOKING DETAILS ── -->
    <tr>
      <td style="padding:0 32px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="border:1px solid #222222;">
          <!-- Section label -->
          <tr>
            <td colspan="2"
              style="padding:13px 20px;background-color:#1a1a1a;border-bottom:1px solid #222222;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;
                letter-spacing:0.25em;color:#c8a97e;text-transform:uppercase;">YOUR BOOKING</p>
            </td>
          </tr>
          <!-- Package -->
          <tr>
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;width:38%;
              font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.1em;
              color:#484840;text-transform:uppercase;">Package</td>
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#F4E7D6;">
              ${booking.package_title}
            </td>
          </tr>
          <!-- Check-in -->
          <tr style="background-color:#141414;">
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.1em;
              color:#484840;text-transform:uppercase;">Check-in</td>
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#F4E7D6;">
              ${fmtDate(booking.check_in)} &middot; 12:00 PM
            </td>
          </tr>
          <!-- Check-out -->
          <tr>
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.1em;
              color:#484840;text-transform:uppercase;">Check-out</td>
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#F4E7D6;">
              ${fmtDate(booking.check_out)} &middot; 11:00 AM
            </td>
          </tr>
          <!-- Guests -->
          <tr style="background-color:#141414;">
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.1em;
              color:#484840;text-transform:uppercase;">Guests</td>
            <td style="padding:13px 20px;border-bottom:1px solid #1d1d1d;
              font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#F4E7D6;">
              ${booking.guests} Guest${booking.guests > 1 ? "s" : ""}
            </td>
          </tr>
          <!-- Booking ref -->
          <tr${booking.total_amount != null ? ' style="border-bottom:1px solid #1d1d1d;"' : ""}>
            <td style="padding:13px 20px;${booking.total_amount != null ? "border-bottom:1px solid #1d1d1d;" : ""}
              font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.1em;
              color:#484840;text-transform:uppercase;">Booking Ref</td>
            <td style="padding:13px 20px;${booking.total_amount != null ? "border-bottom:1px solid #1d1d1d;" : ""}
              font-family:Georgia,'Times New Roman',serif;font-size:13px;
              color:#c8a97e;letter-spacing:0.12em;">#${ref}</td>
          </tr>
          ${
            booking.total_amount != null
              ? `<tr style="background-color:#141414;">
            <td style="padding:13px 20px;
              font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.1em;
              color:#484840;text-transform:uppercase;">Total Amount</td>
            <td style="padding:13px 20px;
              font-family:Georgia,'Times New Roman',serif;font-size:14px;font-weight:bold;
              color:#F4E7D6;">₹${booking.total_amount.toLocaleString("en-IN")}</td>
          </tr>`
              : ""
          }
        </table>
      </td>
    </tr>

    <!-- ── DIVIDER ── -->
    <tr><td style="height:1px;background-color:#222222;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- ── WHAT TO EXPECT ── -->
    <tr>
      <td style="padding:44px 32px 40px;background-color:#0e0e0e;">
        <p style="margin:0 0 8px;text-align:center;font-family:Arial,Helvetica,sans-serif;
          font-size:9px;letter-spacing:0.35em;color:#c8a97e;text-transform:uppercase;">
          WHAT TO EXPECT
        </p>
        <h2 style="margin:0 0 36px;text-align:center;font-family:Georgia,'Times New Roman',serif;
          font-size:24px;color:#F4E7D6;font-weight:400;">
          Moments that stay with you
        </h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <!-- Nature -->
            <td width="25%" valign="top" style="padding:0 8px 0 0;text-align:center;">
              <p style="margin:0 0 10px;font-size:24px;line-height:1;">&#127807;</p>
              <p style="margin:0 0 7px;font-family:Georgia,'Times New Roman',serif;
                font-size:13px;color:#F4E7D6;">Rooted in<br/>Nature</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;
                line-height:1.65;color:#484840;">
                Surrounded by the raw beauty and timeless calm of the Western Ghats.
              </p>
            </td>
            <!-- Stays -->
            <td width="25%" valign="top" style="padding:0 8px;text-align:center;">
              <p style="margin:0 0 10px;font-size:24px;line-height:1;">&#127968;</p>
              <p style="margin:0 0 7px;font-family:Georgia,'Times New Roman',serif;
                font-size:13px;color:#F4E7D6;">Thoughtful<br/>Stays</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;
                line-height:1.65;color:#484840;">
                Warm spaces designed for rest, reflection, and reconnection.
              </p>
            </td>
            <!-- Food -->
            <td width="25%" valign="top" style="padding:0 8px;text-align:center;">
              <p style="margin:0 0 10px;font-size:24px;line-height:1;">&#9749;</p>
              <p style="margin:0 0 7px;font-family:Georgia,'Times New Roman',serif;
                font-size:13px;color:#F4E7D6;">Wholesome<br/>Flavours</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;
                line-height:1.65;color:#484840;">
                Seasonal, local, and crafted with care to nourish and delight.
              </p>
            </td>
            <!-- Experiences -->
            <td width="25%" valign="top" style="padding:0 0 0 8px;text-align:center;">
              <p style="margin:0 0 10px;font-size:24px;line-height:1;">&#9968;</p>
              <p style="margin:0 0 7px;font-family:Georgia,'Times New Roman',serif;
                font-size:13px;color:#F4E7D6;">Curated<br/>Experiences</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;
                line-height:1.65;color:#484840;">
                Coffee estate trails to bonfire nights &mdash; every moment intentional.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── QUOTE ── -->
    <tr>
      <td style="padding:0;background-color:#0a0a0a;
        background-image:url('${siteUrl}/assets/golden_hour_hike.png');
        background-size:cover;background-position:center;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:48px 40px;background-color:#00000099;">
              <p style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;
                font-size:36px;line-height:1;color:#c8a97e;">&ldquo;</p>
              <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;
                font-size:17px;font-style:italic;line-height:1.6;color:#F4E7D6;max-width:340px;">
                In every walk with nature, one receives far more than he seeks.
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;
                letter-spacing:0.25em;color:#c8a97e;text-transform:uppercase;">JOHN MUIR</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── DIVIDER ── -->
    <tr><td style="height:1px;background-color:#222222;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- ── NEED HELP ── -->
    <tr>
      <td style="padding:32px;background-color:#121212;text-align:center;">
        <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;
          color:#847e6e;line-height:1.7;">
          Questions? We&#8217;re here.
        </p>
        <a href="https://wa.me/${WHATSAPP.replace("+", "")}"
          style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#c8a97e;
          text-decoration:none;">
          WhatsApp us at ${WHATSAPP}
        </a>
      </td>
    </tr>

    <!-- ── FOOTER ── -->
    <tr>
      <td align="center"
        style="padding:28px 32px 32px;border-top:1px solid #1e1e1e;background-color:#0d0d0d;">
        <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:9px;
          letter-spacing:0.3em;color:#c8a97e;text-transform:uppercase;">STAY CONNECTED</p>
        <!-- Social icons as text links -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
          style="margin:0 auto 24px;">
          <tr>
            <td style="padding:0 12px;">
              <a href="https://instagram.com/naturekingdomhomestay"
                style="font-family:Arial,Helvetica,sans-serif;font-size:11px;
                color:#847e6e;text-decoration:none;letter-spacing:0.1em;">Instagram</a>
            </td>
            <td style="padding:0 12px;border-left:1px solid #2a2a2a;">
              <a href="${siteUrl}"
                style="font-family:Arial,Helvetica,sans-serif;font-size:11px;
                color:#847e6e;text-decoration:none;letter-spacing:0.1em;">Website</a>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:10px;
          color:#333;line-height:1.6;">
          This is a confirmation email for your upcoming stay at Nature Kingdom Homestay.
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#333;">
          &copy; 2026 Nature Kingdom Homestay &middot; Bommenahalli, Mallenahalli Post, Chikmagalur, Karnataka
        </p>
      </td>
    </tr>

  </table>
  <!-- ── End container ── -->

  </td></tr>
</table>
</body>
</html>`;
}

// ─── Exports ─────────────────────────────────────────────────────────────────

type ClientNotificationBooking = {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  package_title: string;
  guests: number;
  rooms?: { occupancy: number; subtotal: number }[];
  total_amount?: number | null;
};

function roomsTableRows(rooms: ClientNotificationBooking["rooms"]) {
  if (!rooms || rooms.length === 0) return "";
  return rooms
    .map(
      (r, i) =>
        `<tr><td style="padding:8px;border:1px solid #ddd">Room ${i + 1} (${r.occupancy} guest${r.occupancy > 1 ? "s" : ""})</td><td style="padding:8px;border:1px solid #ddd">₹${r.subtotal.toLocaleString("en-IN")}</td></tr>`
    )
    .join("");
}

export function buildClientNotificationHtml(booking: ClientNotificationBooking) {
  // Same short ref the guest sees on the confirmation page and quotes on WhatsApp
  const ref = bookingRef(booking.id);

  return `
      <h2>New booking request received</h2>
      <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif">
        <span style="font-size:12px;color:#666;letter-spacing:0.08em;text-transform:uppercase">Booking Reference</span><br />
        <span style="font-size:26px;font-weight:bold;letter-spacing:0.12em;color:#b8860b">#${ref}</span><br />
        <span style="font-size:11px;color:#999">The guest sees this same reference — they'll quote it on WhatsApp.</span>
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Guest</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.guest_name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Rooms</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.package_title}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Check-in</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.check_in}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Check-out</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.check_out}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Guests</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.guests}</td></tr>
        ${roomsTableRows(booking.rooms)}
        ${
          booking.total_amount != null
            ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Total Amount</strong></td><td style="padding:8px;border:1px solid #ddd"><strong style="color:#b8860b">₹${booking.total_amount.toLocaleString("en-IN")}</strong></td></tr>`
            : ""
        }
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Booking ID</strong></td><td style="padding:8px;border:1px solid #ddd;font-size:11px;color:#888">${booking.id}</td></tr>
      </table>
      <p style="margin-top:16px">Contact the guest on WhatsApp or phone to collect payment and confirm the booking from your admin panel.</p>
    `;
}

export async function sendClientNotification(booking: ClientNotificationBooking) {
  console.log("[email] sendClientNotification called for booking:", booking.id);
  console.log("[email] RESEND_API_KEY set?", !!process.env.RESEND_API_KEY);
  console.log("[email] CLIENT_EMAIL:", CLIENT_EMAIL);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: CLIENT_EMAIL,
    subject: `New Booking Request #${bookingRef(booking.id)} — ${booking.guest_name} (${booking.check_in})`,
    html: buildClientNotificationHtml(booking),
  });

  if (error) {
    console.error("[email] ❌ Resend error:", JSON.stringify(error));
  } else {
    console.log("[email] ✅ Email sent successfully. Resend ID:", data?.id);
  }
}

export async function sendGuestConfirmation(booking: {
  guest_name: string;
  email: string;
  check_in: string;
  check_out: string;
  package_title: string;
  guests: number;
  id: string;
  total_amount?: number | null;
}) {
  console.log("[email] sendGuestConfirmation called for booking:", booking.id);
  console.log("[email] Sending to guest:", booking.email);

  const toEmail =
    process.env.NODE_ENV === "production"
      ? booking.email
      : (process.env.RESEND_TEST_EMAIL ?? booking.email);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: `Your stay at Nature Kingdom Homestay is confirmed — ${fmtDate(booking.check_in)}`,
    html: buildConfirmationHtml(booking),
  });

  if (error) {
    console.error("[email] ❌ Resend error:", JSON.stringify(error));
  } else {
    console.log("[email] ✅ Confirmation email sent. Resend ID:", data?.id);
  }
}
