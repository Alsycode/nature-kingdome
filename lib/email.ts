import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use Resend's test sender for local dev — swap to your verified domain in production
const FROM = process.env.NODE_ENV === "production"
  ? "Nature Kingdom <bookings@naturekingdomhomestay.com>"
  : "Nature Kingdom <onboarding@resend.dev>";
// In dev, all emails go to the test recipient so Resend allows them
const CLIENT_EMAIL = process.env.NODE_ENV === "production"
  ? process.env.CLIENT_EMAIL!
  : (process.env.RESEND_TEST_EMAIL ?? process.env.CLIENT_EMAIL!);
const WHATSAPP = process.env.NEXT_PUBLIC_CLIENT_WHATSAPP!;

export async function sendClientNotification(booking: {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  package_title: string;
  guests: number;
}) {
  console.log("[email] sendClientNotification called for booking:", booking.id);
  console.log("[email] RESEND_API_KEY set?", !!process.env.RESEND_API_KEY);
  console.log("[email] CLIENT_EMAIL:", CLIENT_EMAIL);
  console.log("[email] FROM:", FROM);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: CLIENT_EMAIL,
    subject: `New Booking Request — ${booking.guest_name} (${booking.check_in})`,
    html: `
      <h2>New booking request received</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Guest</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.guest_name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Package</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.package_title}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Check-in</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.check_in}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Check-out</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.check_out}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Guests</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.guests}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Booking ID</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.id}</td></tr>
      </table>
      <p style="margin-top:16px">Contact the guest on WhatsApp or phone to collect payment and confirm the booking from your admin panel.</p>
    `,
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
}) {
  console.log("[email] sendGuestConfirmation called for booking:", booking.id);
  console.log("[email] Sending to guest:", booking.email);

  const toEmail = process.env.NODE_ENV === "production"
    ? booking.email
    : (process.env.RESEND_TEST_EMAIL ?? booking.email);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: "Your booking at Nature Kingdom is confirmed!",
    html: `
      <h2>Booking Confirmed — Nature Kingdom</h2>
      <p>Hi ${booking.guest_name},</p>
      <p>Great news! Your stay at Nature Kingdom has been confirmed. We look forward to welcoming you.</p>
      <table style="border-collapse:collapse;width:100%;max-width:500px;margin:16px 0">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Package</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.package_title}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Check-in</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.check_in} at 12:00 PM</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Check-out</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.check_out} at 11:00 AM</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Guests</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.guests}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Booking Reference</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.id.slice(0, 8).toUpperCase()}</td></tr>
      </table>
      <p>Need help? WhatsApp us at <a href="https://wa.me/${WHATSAPP.replace("+", "")}">${WHATSAPP}</a></p>
      <p style="color:#666;font-size:12px">Nature Kingdom · Bommenahalli, Mallenahalli Post, Chikmagalur, Karnataka</p>
    `,
  });

  if (error) {
    console.error("[email] ❌ Resend error:", JSON.stringify(error));
  } else {
    console.log("[email] ✅ Confirmation email sent. Resend ID:", data?.id);
  }
}
