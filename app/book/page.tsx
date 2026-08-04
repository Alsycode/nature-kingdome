"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { bookingRef } from "@/lib/bookingRef";

const MAX_ROOMS = 4;
const MIN_OCCUPANCY = 1;
const MAX_OCCUPANCY = 5;

type NightBreakdown = { date: string; rate: number; seasonal: boolean; seasonLabel: string | null };
type RoomBreakdown = { occupancy: number; nights: NightBreakdown[]; subtotal: number };
type Quote = { nights: number; rooms: RoomBreakdown[]; totalGuests: number; total: number };

function PriceSpinner() {
  return (
    <span
      aria-label="Calculating price"
      className="w-4 h-4 rounded-full border-2 border-white/15 border-t-[#e9c349] animate-spin flex-shrink-0"
    />
  );
}

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedGuests = Number(searchParams.get("guests")) || 2;

  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [rooms, setRooms] = useState<number[]>([Math.min(Math.max(preselectedGuests, MIN_OCCUPANCY), MAX_OCCUPANCY)]);

  const [form, setForm] = useState({
    guest_name: "",
    email: "",
    phone: "",
    check_in: "",
    check_out: "",
  });

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteError, setQuoteError] = useState("");
  const [quoting, setQuoting] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((dates: string[]) => setBlockedDates(new Set(dates)));
  }, []);

  const totalGuests = rooms.reduce((sum, o) => sum + o, 0);
  const datesValid = !!form.check_in && !!form.check_out && form.check_in < form.check_out;

  // Live price quote — recomputed whenever dates or room occupancy change.
  useEffect(() => {
    if (!datesValid) { setQuote(null); setQuoteError(""); return; }
    setQuoting(true);
    setQuoteError("");
    const controller = new AbortController();
    fetch("/api/pricing/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        check_in: form.check_in,
        check_out: form.check_out,
        rooms: rooms.map((occupancy) => ({ occupancy })),
      }),
      signal: controller.signal,
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) { setQuoteError(data.error ?? "Could not calculate price."); setQuote(null); return; }
        setQuote(data);
      })
      .catch((err) => { if (err.name !== "AbortError") setQuoteError("Could not calculate price."); })
      .finally(() => setQuoting(false));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.check_in, form.check_out, JSON.stringify(rooms), datesValid]);

  function addRoom() {
    if (rooms.length >= MAX_ROOMS) return;
    setRooms((r) => [...r, MIN_OCCUPANCY]);
  }

  function removeRoom(index: number) {
    setRooms((r) => r.filter((_, i) => i !== index));
  }

  function setRoomOccupancy(index: number, occupancy: number) {
    setRooms((r) => r.map((o, i) => (i === index ? occupancy : o)));
  }

  function isDateBlocked(dateStr: string) {
    return blockedDates.has(dateStr);
  }

  function validateDates() {
    if (!form.check_in || !form.check_out) return "Please select check-in and check-out dates.";
    if (form.check_in >= form.check_out) return "Check-out must be after check-in.";

    const start = new Date(form.check_in);
    const end = new Date(form.check_out);
    const cur = new Date(start);
    while (cur < end) {
      const str = cur.toISOString().split("T")[0];
      if (isDateBlocked(str)) return `${str} is already booked. Please choose different dates.`;
      cur.setDate(cur.getDate() + 1);
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const dateError = validateDates();
    if (dateError) { setError(dateError); return; }
    if (!quote) { setError("Please wait for the price to finish calculating."); return; }

    setSubmitting(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        rooms: rooms.map((occupancy) => ({ occupancy })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push(
      `/book/confirmation?ref=${bookingRef(data.id)}&name=${encodeURIComponent(form.guest_name)}&total=${data.total_amount ?? ""}`
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const hasSeasonalNight = quote?.rooms.some((r) => r.nights.some((n) => n.seasonal)) ?? false;

  return (
    <div className="min-h-screen bg-[#0e1a13] text-white">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5">
        <a href="/" className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans">← Nature Kingdom</a>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <p className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans mb-3">Reserve Your Stay</p>
          <h1 className="text-4xl font-serif text-white">Book Now</h1>
          <p className="text-white/40 text-sm mt-3 leading-relaxed">
            Fill in your details and we will reach out on WhatsApp to confirm your booking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Check-in</label>
              <input
                type="date"
                min={today}
                value={form.check_in}
                onChange={(e) => setForm((f) => ({ ...f, check_in: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e9c349]/50 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Check-out</label>
              <input
                type="date"
                min={form.check_in || today}
                value={form.check_out}
                onChange={(e) => setForm((f) => ({ ...f, check_out: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e9c349]/50 [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Rooms */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] text-white/40 tracking-wide uppercase">Rooms &amp; Guests</label>
              <span className="text-[10px] text-white/30">{totalGuests} guest{totalGuests > 1 ? "s" : ""} total</span>
            </div>
            <div className="space-y-2">
              {rooms.map((occupancy, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-white/40 w-16 flex-shrink-0">Room {i + 1}</span>
                  <select
                    value={occupancy}
                    onChange={(e) => setRoomOccupancy(i, Number(e.target.value))}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e9c349]/50 appearance-none"
                  >
                    {Array.from({ length: MAX_OCCUPANCY - MIN_OCCUPANCY + 1 }, (_, k) => MIN_OCCUPANCY + k).map((n) => (
                      <option key={n} value={n} className="bg-[#0e1a13]">{n} Guest{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                  {rooms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRoom(i)}
                      aria-label="Remove room"
                      className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-white/5 text-white/40 rounded-lg hover:bg-red-600/20 hover:text-red-300 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {rooms.length < MAX_ROOMS && (
              <button
                type="button"
                onClick={addRoom}
                className="mt-2 text-xs text-[#e9c349]/80 hover:text-[#e9c349] transition"
              >
                + Add another room
              </button>
            )}
            <p className="text-[10px] text-white/25 mt-1.5">Up to {MAX_ROOMS} rooms, {MIN_OCCUPANCY}–{MAX_OCCUPANCY} guests per room.</p>
          </div>

          {/* Price breakdown */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3.5 overflow-hidden">
            {!datesValid ? (
              <p className="text-xs text-white/30">Select your dates to see pricing.</p>
            ) : quoteError && !quoting ? (
              <p className="text-xs text-red-300">{quoteError}</p>
            ) : quote ? (
              <div className={`space-y-2 transition-opacity duration-200 ${quoting ? "opacity-35" : "opacity-100"}`}>
                {hasSeasonalNight && (
                  <p className="text-[10px] text-[#e9c349] uppercase tracking-wide">Festive season rate applied</p>
                )}
                {quote.rooms.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-white/50">
                    <span>Room {i + 1} · {r.occupancy} guest{r.occupancy > 1 ? "s" : ""} · {quote.nights} night{quote.nights > 1 ? "s" : ""}</span>
                    <span className="text-white/70">₹{r.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-sm text-white font-medium">Total</span>
                  <span className="text-lg text-[#e9c349] font-semibold">₹{quote.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ) : quoting ? (
              <div className="flex items-center gap-2.5 py-1">
                <PriceSpinner />
                <p className="text-xs text-white/40">Calculating price...</p>
              </div>
            ) : null}

            {quoting && quote && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0e1a13]/50">
                <PriceSpinner />
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div>
            <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Full Name</label>
            <input
              type="text"
              value={form.guest_name}
              onChange={(e) => setForm((f) => ({ ...f, guest_name: e.target.value }))}
              required
              placeholder="Your full name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
            />
          </div>

          <div>
            <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
            />
          </div>

          <div>
            <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">WhatsApp / Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
              pattern="[+]?[0-9\s\-]{7,15}"
              title="Enter a valid phone number (7–15 digits)"
              placeholder="+91 98765 43210"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || quoting || !quote}
            className="w-full bg-[#e9c349] text-[#0e1a13] font-semibold py-4 rounded-xl hover:bg-[#e9c349]/90 transition text-sm disabled:opacity-50 mt-2"
          >
            {submitting ? "Reserving your dates..." : "Reserve My Dates"}
          </button>

          <p className="text-center text-xs text-white/25 leading-relaxed">
            No payment required now. We will contact you on WhatsApp to confirm and arrange payment.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0e1a13]" />}>
      <BookingForm />
    </Suspense>
  );
}
