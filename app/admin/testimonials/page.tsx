"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { adminHeaders, getStoredToken, clearStoredToken } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";
import Pagination from "@/components/admin/Pagination";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image_url: string;
  active: boolean;
  created_at: string;
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Bookings" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials", active: true },
];

const emptyForm = { quote: "", name: "", role: "", image_url: "" };
const PAGE_SIZE = 8;

export default function TestimonialsAdmin() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");
  const [page, setPage] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials", { headers: adminHeaders() });
    if (res.status === 401) { router.push("/admin"); return; }
    setItems(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!getStoredToken()) { router.push("/admin"); return; }
    fetchItems();
  }, [fetchItems, router]);

  useEffect(() => { setPage(1); }, [statusFilter]);

  const filteredItems = items.filter((t) => {
    if (statusFilter === "active") return t.active;
    if (statusFilter === "hidden") return !t.active;
    return true;
  });

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function startNew() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
    setUploading(false);
  }

  function startEdit(t: Testimonial) {
    setEditing(t);
    setForm({ quote: t.quote, name: t.name, role: t.role, image_url: t.image_url });
    setShowForm(true);
    setError("");
    setUploading(false);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "nature-kingdom/testimonials");
    const res = await fetch("/api/upload", { method: "POST", headers: { "x-admin-token": getStoredToken() ?? "" }, body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { setError(data.error ?? "Upload failed"); return; }
    setForm((f) => ({ ...f, image_url: data.url }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { quote: form.quote, name: form.name, role: form.role, image_url: form.image_url };
    const res = editing
      ? await fetch(`/api/testimonials/${editing.id}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(payload) })
      : await fetch("/api/testimonials", { method: "POST", headers: adminHeaders(), body: JSON.stringify(payload) });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Failed to save.");
    } else {
      setShowForm(false);
      fetchItems();
    }
    setSaving(false);
  }

  async function toggleActive(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify({ active: !t.active }) });
    fetchItems();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this testimonial permanently?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE", headers: adminHeaders() });
    fetchItems();
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
              + Add Testimonial
            </button>
            <button
              onClick={() => { clearStoredToken(); router.push("/admin"); }}
              className="text-xs text-white/40 hover:text-white transition"
            >
              Sign Out
            </button>
          </>
        }
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif">Testimonials</h2>
          <p className="text-xs text-white/30">{items.length} total</p>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-start sm:items-center justify-center z-50 px-4 pt-6 sm:pt-0 overflow-y-auto">
            <div className="bg-[#111e15] border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-md my-auto">
              <h3 className="text-lg font-serif mb-5">{editing ? "Edit Testimonial" : "New Testimonial"}</h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">Quote</label>
                  <textarea
                    rows={3}
                    required
                    value={form.quote}
                    onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                    placeholder="The campfire conversations stayed with us long after we left."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">Guest Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Rohan V."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">Role / Label</label>
                    <input
                      type="text"
                      required
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                      placeholder="Couple, Solo Traveler…"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">
                    Background Image <span className="normal-case text-white/20">(optional)</span>
                  </label>
                  {form.image_url ? (
                    <div className="relative">
                      <img src={form.image_url} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, image_url: "" }))}
                        className="absolute top-2 right-2 w-6 h-6 bg-black/70 text-white/80 rounded-full text-xs hover:bg-black transition flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border border-dashed border-white/15 rounded-lg p-5 text-center cursor-pointer hover:border-[#e9c349]/40 hover:bg-white/[0.02] transition"
                    >
                      {uploading ? (
                        <p className="text-white/40 text-xs">Uploading...</p>
                      ) : (
                        <>
                          <p className="text-white/40 text-xs mb-1">Click to upload background image</p>
                          <p className="text-white/20 text-[10px]">JPEG, PNG, WebP · Max 5 MB</p>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }}
                  />
                  {!form.image_url && (
                    <input
                      type="url"
                      placeholder="Or paste an image URL"
                      value={form.image_url}
                      onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                      className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                    />
                  )}
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="flex-1 bg-[#e9c349] text-[#0e1a13] font-semibold text-sm py-2.5 rounded-lg hover:bg-[#e9c349]/90 transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
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
          <p className="text-white/40 text-sm">Loading testimonials...</p>
        ) : (
          <>
            {/* ── Filters ── */}
            {items.length > 0 && (
              <div className="flex gap-1.5 flex-wrap mb-5">
                {(["all", "active", "hidden"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition capitalize ${
                      statusFilter === s
                        ? "bg-[#e9c349] text-[#0e1a13]"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {s === "all" ? "All" : s === "active" ? "Active" : "Hidden"}
                    <span className="ml-1 opacity-60">
                      ({s === "all"
                        ? items.length
                        : s === "active"
                        ? items.filter((t) => t.active).length
                        : items.filter((t) => !t.active).length})
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* ── List ── */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
                {items.length === 0 ? (
                  <>
                    <p className="text-white/30 text-sm mb-4">No testimonials yet</p>
                    <button
                      onClick={startNew}
                      className="px-5 py-2.5 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition"
                    >
                      Add your first testimonial
                    </button>
                  </>
                ) : (
                  <p className="text-white/30 text-sm">No {statusFilter} testimonials.</p>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginatedItems.map((t) => (
                    <div
                      key={t.id}
                      className={`bg-white/[0.03] border rounded-xl p-4 sm:p-5 ${t.active ? "border-white/5" : "border-red-500/10 opacity-60"}`}
                    >
                      <div className="flex gap-3 sm:gap-4 items-start">
                        {t.image_url && (
                          <img src={t.image_url} alt={t.name} className="w-14 h-12 sm:w-16 sm:h-14 object-cover rounded-lg flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white/80 text-sm italic leading-relaxed mb-2">"{t.quote}"</p>
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                            <span className="text-white font-medium">{t.name}</span>
                            <span className="text-white/30">·</span>
                            <span className="text-[#e9c349]/60 uppercase tracking-wider" style={{ fontSize: 9 }}>{t.role}</span>
                            {!t.active && <span className="ml-1 text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">Hidden</span>}
                          </div>
                          <p className="text-white/20 text-[10px] mt-1">
                            Added {new Date(t.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 flex-shrink-0">
                          <button onClick={() => startEdit(t)} className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition">Edit</button>
                          <button onClick={() => toggleActive(t)} className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition">
                            {t.active ? "Hide" : "Show"}
                          </button>
                          <button onClick={() => deleteItem(t.id)} className="px-3 py-1.5 bg-white/5 text-white/30 text-xs rounded-lg hover:bg-red-600/20 hover:text-red-300 transition">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={filteredItems.length}
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
