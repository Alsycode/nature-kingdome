"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Package = {
  id: string;
  title: string;
  price: number;
  nights: number;
};

function guestsFromTitle(title: string): number | null {
  const t = title.toLowerCase();
  if (t.includes("double")) return 2;
  if (t.includes("three")) return 3;
  if (t.includes("four")) return 4;
  if (t.includes("five")) return 5;
  return null;
}

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("package");

  const [packages, setPackages] = useState<Package[]>([]);
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

  const [form, setForm] = useState({
    guest_name: "",
    email: "",
    phone: "",
    check_in: "",
    check_out: "",
    package_id: preselectedId ?? "",
    guests: "2",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => setPackages(data.filter((p: Package & { active: boolean }) => p.active)));
    fetch("/api/availability")
      .then((r) => r.json())
      .then((dates: string[]) => setBlockedDates(new Set(dates)));
  }, []);

  const selectedPkg = packages.find((p) => p.id === form.package_id);
  const fixedGuests = selectedPkg ? guestsFromTitle(selectedPkg.title) : null;

  useEffect(() => {
    if (fixedGuests !== null) {
      setForm((f) => ({ ...f, guests: String(fixedGuests) }));
    }
  }, [form.package_id, fixedGuests]);

  function isDateBlocked(dateStr: string) {
    return blockedDates.has(dateStr);
  }

  function validateDates() {
    if (!form.check_in || !form.check_out) return "Please select check-in and check-out dates.";
    if (form.check_in >= form.check_out) return "Check-out must be after check-in.";

    // Check if any date in range is blocked
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

    setSubmitting(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        guests: parseInt(form.guests),
        package_id: form.package_id || null,
        package_title: selectedPkg?.title ?? "General Stay",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push(`/book/confirmation?ref=${data.id.slice(0, 8).toUpperCase()}&name=${encodeURIComponent(form.guest_name)}`);
  }

  const today = new Date().toISOString().split("T")[0];

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
          {/* Package Selection */}
          <div>
            <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Package</label>
            <select
              value={form.package_id}
              onChange={(e) => setForm((f) => ({ ...f, package_id: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e9c349]/50 appearance-none"
            >
              <option value="">General Stay (No specific package)</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0e1a13]">
                  {p.title} — ₹{p.price.toLocaleString("en-IN")} / person / night
                </option>
              ))}
            </select>
          </div>

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

          {/* Guest Count */}
          <div>
            <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Number of Guests</label>
            <select
              value={form.guests}
              onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
              disabled={fixedGuests !== null}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e9c349]/50 appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {fixedGuests !== null
                ? <option value={fixedGuests} className="bg-[#0e1a13]">{fixedGuests} Guests</option>
                : [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-[#0e1a13]">{n} Guest{n > 1 ? "s" : ""}</option>
                  ))
              }
            </select>
            {fixedGuests !== null && (
              <p className="text-[10px] text-white/30 mt-1.5">Guest count is fixed by the selected sharing package.</p>
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
            disabled={submitting}
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
