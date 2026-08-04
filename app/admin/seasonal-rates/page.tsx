"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { adminHeaders, getStoredToken, clearStoredToken } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";
import { MIN_OCCUPANCY, MAX_OCCUPANCY } from "@/lib/pricingConstants";

type SeasonalRate = {
  id: string;
  label: string;
  start_date: string;
  end_date: string;
  rates: Record<string, number>;
  active: boolean;
};

const OCCUPANCIES = Array.from(
  { length: MAX_OCCUPANCY - MIN_OCCUPANCY + 1 },
  (_, i) => MIN_OCCUPANCY + i
);

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Bookings" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/seasonal-rates", label: "Seasonal Rates", active: true },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function emptyRates() {
  return Object.fromEntries(OCCUPANCIES.map((o) => [String(o), ""])) as Record<string, string>;
}

export default function SeasonalRatesAdmin() {
  const router = useRouter();
  const [seasons, setSeasons] = useState<SeasonalRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [label, setLabel] = useState("");
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [monthPick, setMonthPick] = useState("");
  const [rates, setRates] = useState<Record<string, string>>(emptyRates());
  const [active, setActive] = useState(true);

  const fetchSeasons = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/seasonal-rates", { headers: adminHeaders() });
    if (res.status === 401) { router.push("/admin"); return; }
    setSeasons(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!getStoredToken()) { router.push("/admin"); return; }
    fetchSeasons();
  }, [fetchSeasons, router]);

  function startNew() {
    setEditingId(null);
    setLabel("");
    setRange(undefined);
    setMonthPick("");
    setRates(emptyRates());
    setActive(true);
    setError("");
    setShowForm(true);
  }

  function startEdit(season: SeasonalRate) {
    setEditingId(season.id);
    setLabel(season.label);
    setRange({
      from: new Date(season.start_date + "T00:00:00"),
      to: new Date(season.end_date + "T00:00:00"),
    });
    setMonthPick("");
    setRates(
      Object.fromEntries(OCCUPANCIES.map((o) => [String(o), String(season.rates[String(o)] ?? "")]))
    );
    setActive(season.active);
    setError("");
    setShowForm(true);
  }

  function applyWholeMonth(value: string) {
    setMonthPick(value);
    if (!value) return;
    const [year, month] = value.split("-").map(Number);
    const from = new Date(year, month - 1, 1);
    const to = new Date(year, month, 0);
    setRange({ from, to });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!label.trim()) { setError("Label is required."); return; }
    if (!range?.from || !range?.to) { setError("Select a date range on the calendar."); return; }
    for (const o of OCCUPANCIES) {
      const v = rates[String(o)];
      if (!v || Number(v) <= 0) { setError(`Enter a price for ${o}-guest occupancy.`); return; }
    }

    setSaving(true);
    const payload = {
      label: label.trim(),
      start_date: toISODate(range.from),
      end_date: toISODate(range.to),
      rates: Object.fromEntries(OCCUPANCIES.map((o) => [String(o), Number(rates[String(o)])])),
      active,
    };

    const res = editingId
      ? await fetch(`/api/seasonal-rates/${editingId}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(payload) })
      : await fetch("/api/seasonal-rates", { method: "POST", headers: adminHeaders(), body: JSON.stringify(payload) });

    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Failed to save.");
    } else {
      setShowForm(false);
      fetchSeasons();
    }
    setSaving(false);
  }

  async function toggleActive(season: SeasonalRate) {
    await fetch(`/api/seasonal-rates/${season.id}`, {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({ active: !season.active }),
    });
    fetchSeasons();
  }

  async function deleteSeason(id: string) {
    if (!confirm("Delete this seasonal rate?")) return;
    await fetch(`/api/seasonal-rates/${id}`, { method: "DELETE", headers: adminHeaders() });
    fetchSeasons();
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
          <>
            <button
              onClick={startNew}
              className="px-4 py-2 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition w-full sm:w-auto"
            >
              + Add Season
            </button>
            <button onClick={logout} className="text-xs text-white/40 hover:text-white transition">
              Sign Out
            </button>
          </>
        }
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-serif">Seasonal Rates</h2>
          <p className="text-xs text-white/30">{seasons.length} total</p>
        </div>
        <p className="text-xs text-white/40 mb-6 leading-relaxed max-w-xl">
          Set a different room rate for festive dates (e.g. Christmas week). A stay booked in advance
          for those dates automatically uses this rate — night by night — regardless of when it was booked.
        </p>

        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-start sm:items-center justify-center z-50 px-4 py-6 overflow-y-auto">
            <div className="bg-[#111e15] border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-2xl my-auto">
              <h3 className="text-lg font-serif mb-5">{editingId ? "Edit Season" : "New Season"}</h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">Label</label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="e.g. Christmas 2026"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start">
                  <div
                    className="rounded-lg overflow-x-auto bg-white/[0.02] border border-white/10 p-3 [&_.rdp-root]:text-white"
                    style={
                      {
                        "--rdp-accent-color": "#e9c349",
                        "--rdp-accent-background-color": "rgba(233,195,73,0.18)",
                        "--rdp-range_start-color": "#0e1a13",
                        "--rdp-range_end-color": "#0e1a13",
                      } as React.CSSProperties
                    }
                  >
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      numberOfMonths={1}
                    />
                  </div>
                  <div className="space-y-2 sm:w-40">
                    <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">
                      Or pick a whole month
                    </label>
                    <input
                      type="month"
                      value={monthPick}
                      onChange={(e) => applyWholeMonth(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e9c349]/50 [color-scheme:dark]"
                    />
                    {range?.from && range?.to && (
                      <p className="text-[10px] text-white/40 leading-relaxed pt-1">
                        {toISODate(range.from)} → {toISODate(range.to)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/40 mb-2 tracking-wide uppercase">
                    Total room price / night, by occupancy
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {OCCUPANCIES.map((o) => (
                      <div key={o}>
                        <label className="block text-[9px] text-white/30 mb-1">{o} guest{o > 1 ? "s" : ""}</label>
                        <input
                          type="number"
                          min={0}
                          value={rates[String(o)]}
                          onChange={(e) => setRates((r) => ({ ...r, [String(o)]: e.target.value }))}
                          placeholder="₹"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-white/50">
                  <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                  Active
                </label>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#e9c349] text-[#0e1a13] font-semibold text-sm py-2.5 rounded-lg hover:bg-[#e9c349]/90 transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Season"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2.5 bg-white/5 text-white/50 text-sm rounded-lg hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-white/40 text-sm">Loading seasonal rates...</p>
        ) : seasons.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-white/30 text-sm mb-4">No seasonal rates set yet</p>
            <button
              onClick={startNew}
              className="px-5 py-2.5 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition"
            >
              Add your first season
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {seasons.map((season) => (
              <div
                key={season.id}
                className={`bg-white/[0.03] border rounded-xl p-4 sm:p-5 ${season.active ? "border-white/5" : "border-red-500/10 opacity-60"}`}
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-medium text-white text-sm">{season.label}</h3>
                  {!season.active && (
                    <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">Inactive</span>
                  )}
                </div>
                <p className="text-xs text-white/40 mb-2">{season.start_date} → {season.end_date}</p>
                <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-3">
                  {OCCUPANCIES.map((o) => (
                    <span key={o}>
                      {o}g: <span className="text-[#e9c349]">₹{Number(season.rates[String(o)] ?? 0).toLocaleString("en-IN")}</span>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-3 border-t border-white/5 flex-wrap">
                  <button
                    onClick={() => startEdit(season)}
                    className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(season)}
                    className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition"
                  >
                    {season.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteSeason(season.id)}
                    className="px-3 py-1.5 bg-white/5 text-white/30 text-xs rounded-lg hover:bg-red-600/20 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
