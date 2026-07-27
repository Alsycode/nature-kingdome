// The short, guest-facing booking reference. Derived from the booking's UUID so
// the confirmation page, the guest email and the admin email all show the same
// thing — a guest quoting "A3F91C2D" on WhatsApp should match what the host sees.
export function bookingRef(id: string) {
  return id.slice(0, 8).toUpperCase();
}
