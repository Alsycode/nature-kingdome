"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { adminHeaders, getStoredToken, clearStoredToken } from "@/lib/adminAuth";
import { bookingRef } from "@/lib/bookingRef";
import AdminNav from "@/components/admin/AdminNav";
import Pagination from "@/components/admin/Pagination";

type Booking = {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  package_title: string;
  guests: number;
  total_amount: number | null;
  status: "pending_payment" | "confirmed" | "cancelled";
  notes: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  all: "All",
  pending_payment: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "bg-yellow-500/20 text-yellow-300",
  confirmed: "bg-green-500/20 text-green-300",
  cancelled: "bg-red-500/20 text-red-300",
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Bookings", active: true },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/seasonal-rates", label: "Seasonal Rates" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

const PAGE_SIZE = 10;

// ─── Calendar helpers ───────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function dateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type DayStatus = "available" | "pending" | "confirmed" | "partial";

function buildDayMap(bookings: Booking[]): Record<string, DayStatus> {
  const map: Record<string, { pending: boolean; confirmed: boolean }> = {};
  for (const b of bookings) {
    if (b.status === "cancelled") continue;
    const start = new Date(b.check_in);
    const end = new Date(b.check_out);
    const cur = new Date(start);
    while (cur < end) {
      const key = cur.toISOString().split("T")[0];
      if (!map[key]) map[key] = { pending: false, confirmed: false };
      if (b.status === "confirmed") map[key].confirmed = true;
      if (b.status === "pending_payment") map[key].pending = true;
      cur.setDate(cur.getDate() + 1);
    }
  }
  const result: Record<string, DayStatus> = {};
  for (const [key, val] of Object.entries(map)) {
    if (val.confirmed && val.pending) result[key] = "partial";
    else if (val.confirmed) result[key] = "confirmed";
    else result[key] = "pending";
  }
  return result;
}

// ─── Calendar Component ─────────────────────────────────────────────────────

function CalendarView({ bookings }: { bookings: Booking[] }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const dayMap = buildDayMap(bookings);
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
    setSelectedDate(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
    setSelectedDate(null);
  }

  const selectedBookings = selectedDate
    ? bookings.filter((b) => b.status !== "cancelled" && b.check_in <= selectedDate && b.check_out > selectedDate)
    : [];

  function dayStyle(status: DayStatus | undefined, isToday: boolean) {
    const base = "relative w-full aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition cursor-pointer select-none ";
    if (!status) return base + (isToday ? "border border-[#e9c349]/40 text-white/60" : "text-white/30 hover:bg-white/5");
    if (status === "confirmed") return base + "bg-green-500/25 text-green-200 hover:bg-green-500/35";
    if (status === "pending") return base + "bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30";
    if (status === "partial") return base + "bg-orange-500/20 text-orange-200 hover:bg-orange-500/30";
    return base;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
        {[
          { color: "bg-green-500/30", label: "Confirmed" },
          { color: "bg-yellow-500/25", label: "Pending Payment" },
          { color: "bg-orange-500/25", label: "Mixed" },
          { color: "bg-white/5 border border-white/10", label: "Available" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm ${color} inline-block`} />
            <span className="text-xs text-white/50">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-5">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition text-lg">‹</button>
          <p className="text-sm font-medium text-white">{MONTH_NAMES[viewMonth]} {viewYear}</p>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition text-lg">›</button>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-center text-[10px] text-white/25 tracking-wider pb-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const ds = dateStr(viewYear, viewMonth, day);
            const status = dayMap[ds];
            const isToday = ds === today.toISOString().split("T")[0];
            const isSelected = ds === selectedDate;
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : ds)}
                className={dayStyle(status, isToday) + (isSelected ? " ring-2 ring-[#e9c349]/60" : "")}
              >
                <span className="font-medium">{day}</span>
                {status && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-current opacity-60" />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 sm:p-5">
          <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-3">
            {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          {selectedBookings.length === 0 ? (
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              <p className="text-sm text-green-300">Available — no bookings on this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedBookings.map((b) => (
                <div key={b.id} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 bg-white/[0.03] rounded-lg p-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-white">{b.guest_name}</p>
                    <p className="text-xs text-white/40">
                      {b.package_title} · {b.guests} guest{b.guests > 1 ? "s" : ""}
                      {b.total_amount != null && ` · ₹${b.total_amount.toLocaleString("en-IN")}`}
                    </p>
                    <p className="text-xs text-white/30">{b.check_in} → {b.check_out}</p>
                    <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-xs text-green-400 hover:text-green-300 transition">{b.phone}</a>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium self-start flex-shrink-0 ${STATUS_COLORS[b.status]}`}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/bookings?status=all`, { headers: adminHeaders() });
    if (res.status === 401) { router.push("/admin"); return; }
    setBookings(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!getStoredToken()) { router.push("/admin"); return; }
    fetchBookings();
  }, [fetchBookings, router]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [statusFilter, search, dateFrom, dateTo]);

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!b.guest_name.toLowerCase().includes(q) && !b.email.toLowerCase().includes(q) && !b.phone.includes(q)) return false;
    }
    if (dateFrom && b.check_in < dateFrom) return false;
    if (dateTo && b.check_in > dateTo) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE);
  const paginatedBookings = filteredBookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasActiveFilters = search || dateFrom || dateTo || statusFilter !== "all";

  function resetFilters() {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setStatusFilter("all");
  }

  async function updateStatus(booking: Booking, status: Booking["status"]) {
    await fetch(`/api/bookings/${booking.id}`, {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({ status, _prevStatus: booking.status }),
    });
    fetchBookings();
  }

  async function saveNotes(booking: Booking) {
    setSaving(true);
    await fetch(`/api/bookings/${booking.id}`, {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({ notes: editNotes, _prevStatus: booking.status }),
    });
    setSaving(false);
    setEditingId(null);
    fetchBookings();
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking permanently?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE", headers: adminHeaders() });
    fetchBookings();
  }

  function logout() {
    clearStoredToken();
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-[#0e1a13] text-white">
      <AdminNav
        items={NAV_ITEMS}
        rightSlot={
          <button onClick={logout} className="text-xs text-white/40 hover:text-white transition">
            Sign Out
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* View Toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition ${activeTab === "list" ? "bg-[#e9c349] text-[#0e1a13]" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
          >
            📋 <span className="hidden sm:inline">Bookings </span>List
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition ${activeTab === "calendar" ? "bg-[#e9c349] text-[#0e1a13]" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
          >
            📅 <span className="hidden sm:inline">Calendar </span>View
          </button>
        </div>

        {loading ? (
          <p className="text-white/40 text-sm">Loading bookings...</p>
        ) : activeTab === "calendar" ? (
          <CalendarView bookings={bookings} />
        ) : (
          <>
            {/* ── Filters ── */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-5 space-y-4">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by guest name, email or phone…"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#e9c349]/40"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">✕</button>
                )}
              </div>

              {/* Status + Date Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Status pills */}
                <div className="flex gap-1.5 flex-wrap flex-1">
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setStatusFilter(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        statusFilter === key
                          ? "bg-[#e9c349] text-[#0e1a13]"
                          : "bg-white/5 text-white/50 hover:bg-white/10"
                      }`}
                    >
                      {label}
                      <span className="ml-1 opacity-60">
                        ({key === "all" ? bookings.length : bookings.filter((b) => b.status === key).length})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Date range */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="relative flex-1 sm:flex-initial">
                    <label className="block text-[10px] text-white/30 mb-1 uppercase tracking-wider">Check-in From</label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full sm:w-36 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#e9c349]/40 [color-scheme:dark]"
                    />
                  </div>
                  <div className="flex-1 sm:flex-initial">
                    <label className="block text-[10px] text-white/30 mb-1 uppercase tracking-wider">Check-in To</label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full sm:w-36 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#e9c349]/40 [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Active filter summary */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <p className="text-xs text-white/40">
                    {filteredBookings.length} result{filteredBookings.length !== 1 ? "s" : ""} found
                  </p>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#e9c349]/70 hover:text-[#e9c349] transition"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* ── Booking List ── */}
            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-xl">
                <p className="text-white/30 text-sm">No bookings match your filters.</p>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="mt-3 text-xs text-[#e9c349]/70 hover:text-[#e9c349] transition">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginatedBookings.map((b) => (
                    <div key={b.id} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 sm:p-5">
                      {/* Top row: name + status */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-medium text-white text-sm sm:text-base">{b.guest_name}</p>
                          <p className="text-xs text-white/50 mt-0.5">{b.email}</p>
                          <a
                            href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-green-400 hover:text-green-300 transition"
                          >
                            {b.phone}
                          </a>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex-shrink-0 ${STATUS_COLORS[b.status]}`}>
                          {STATUS_LABELS[b.status]}
                        </span>
                      </div>

                      {/* Middle: booking details */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 py-3 border-t border-b border-white/5 mb-3">
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Rooms</p>
                          <p className="text-sm text-white/80">{b.package_title}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Dates</p>
                          <p className="text-sm text-white/80">{b.check_in} → {b.check_out}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Guests</p>
                          <p className="text-sm text-white/80">{b.guests} guest{b.guests > 1 ? "s" : ""}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Total</p>
                          <p className="text-sm text-[#e9c349] font-medium">
                            {b.total_amount != null ? `₹${b.total_amount.toLocaleString("en-IN")}` : "—"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {b.status === "pending_payment" && (
                          <button
                            onClick={() => updateStatus(b, "confirmed")}
                            className="px-3 py-1.5 bg-green-600/20 text-green-300 text-xs rounded-lg hover:bg-green-600/30 transition"
                          >
                            Mark Confirmed
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(b, "cancelled")}
                            className="px-3 py-1.5 bg-red-600/20 text-red-300 text-xs rounded-lg hover:bg-red-600/30 transition"
                          >
                            Cancel
                          </button>
                        )}
                        {b.status === "cancelled" && (
                          <button
                            onClick={() => updateStatus(b, "pending_payment")}
                            className="px-3 py-1.5 bg-white/5 text-white/50 text-xs rounded-lg hover:bg-white/10 transition"
                          >
                            Restore
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="px-3 py-1.5 bg-white/5 text-white/30 text-xs rounded-lg hover:bg-red-600/20 hover:text-red-300 transition"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Notes */}
                      <div className="mt-3 pt-3 border-t border-white/5">
                        {editingId === b.id ? (
                          <div className="flex gap-2">
                            <input
                              className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#e9c349]/50"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Add notes..."
                            />
                            <button
                              onClick={() => saveNotes(b)}
                              disabled={saving}
                              className="px-3 py-1 bg-[#e9c349] text-[#0e1a13] text-xs rounded font-medium disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-white/5 text-white/40 text-xs rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditingId(b.id); setEditNotes(b.notes); }}
                            className="text-xs text-white/30 hover:text-white/60 transition"
                          >
                            {b.notes ? `📝 ${b.notes}` : "+ Add note"}
                          </button>
                        )}
                      </div>

                      <p className="text-[10px] text-white/20 mt-2">
                        #{bookingRef(b.id)} · {new Date(b.created_at).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={filteredBookings.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
