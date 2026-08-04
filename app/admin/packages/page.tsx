"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { adminHeaders, getStoredToken, clearStoredToken } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";

type Package = {
  id: string;
  number: string;
  title: string;
  description: string;
  price: number;
  nights: number;
  features: { label: string }[];
  image_url: string;
  image_alt: string;
  active: boolean;
  occupancy: number | null;
};

const emptyForm = {
  number: "",
  title: "",
  description: "",
  price: "",
  nights: "2",
  occupancy: "",
  features: "",
  image_url: "",
  image_alt: "",
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Bookings" },
  { href: "/admin/packages", label: "Packages", active: true },
  { href: "/admin/seasonal-rates", label: "Seasonal Rates" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function PackagesAdmin() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/packages", { headers: adminHeaders() });
    if (res.status === 401) { router.push("/admin"); return; }
    setPackages(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!getStoredToken()) { router.push("/admin"); return; }
    fetchPackages();
  }, [fetchPackages, router]);

  function startEdit(pkg: Package) {
    setEditingPkg(pkg);
    setForm({
      number: pkg.number,
      title: pkg.title,
      description: pkg.description,
      price: String(pkg.price),
      nights: String(pkg.nights),
      occupancy: pkg.occupancy != null ? String(pkg.occupancy) : "",
      features: pkg.features.map((f) => f.label).join(", "),
      image_url: pkg.image_url,
      image_alt: pkg.image_alt,
    });
    setShowForm(true);
    setError("");
    setUploading(false);
  }

  function startNew() {
    setEditingPkg(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
    setUploading(false);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "nature-kingdom/packages");
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
    const payload = {
      number: form.number,
      title: form.title,
      description: form.description,
      price: parseInt(form.price),
      nights: parseInt(form.nights),
      occupancy: form.occupancy ? parseInt(form.occupancy) : null,
      features: form.features.split(",").map((f) => ({ label: f.trim() })).filter((f) => f.label),
      image_url: form.image_url,
      image_alt: form.image_alt,
    };
    const res = editingPkg
      ? await fetch(`/api/packages/${editingPkg.id}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(payload) })
      : await fetch("/api/packages", { method: "POST", headers: adminHeaders(), body: JSON.stringify(payload) });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Failed to save.");
    } else {
      setShowForm(false);
      fetchPackages();
    }
    setSaving(false);
  }

  async function toggleActive(pkg: Package) {
    await fetch(`/api/packages/${pkg.id}`, {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({ active: !pkg.active }),
    });
    fetchPackages();
  }

  async function deletePackage(id: string) {
    if (!confirm("Delete this package?")) return;
    await fetch(`/api/packages/${id}`, { method: "DELETE", headers: adminHeaders() });
    fetchPackages();
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
              + Add Package
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif">Packages</h2>
          <p className="text-xs text-white/30">{packages.length} total</p>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-start sm:items-center justify-center z-50 px-4 pt-6 sm:pt-0 overflow-y-auto">
            <div className="bg-[#111e15] border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-lg my-auto">
              <h3 className="text-lg font-serif mb-5">{editingPkg ? "Edit Package" : "New Package"}</h3>
              <form onSubmit={handleSave} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Number (e.g. 01)" value={form.number} onChange={(v) => setForm((f) => ({ ...f, number: v }))} />
                  <Field label="Nights" type="number" value={form.nights} onChange={(v) => setForm((f) => ({ ...f, nights: v }))} required />
                </div>
                <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
                <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} required />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price (₹ / person)" type="number" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} required />
                  <Field
                    label="Occupancy (guests/room)"
                    type="number"
                    value={form.occupancy}
                    onChange={(v) => setForm((f) => ({ ...f, occupancy: v }))}
                    placeholder="1–5"
                  />
                </div>
                <p className="text-[10px] text-white/25 -mt-1">
                  Occupancy marks this as the base rate for that room size — used by the booking form&apos;s price calculator.
                </p>
                <Field
                  label="Features (comma separated)"
                  value={form.features}
                  onChange={(v) => setForm((f) => ({ ...f, features: v }))}
                  placeholder="2 Nights Stay, All Meals, Nature Trails"
                />
                <div>
                  <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">Package Image</label>
                  {form.image_url ? (
                    <div className="relative">
                      <img src={form.image_url} alt="Preview" className="w-full h-36 object-cover rounded-lg" />
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
                      className="border border-dashed border-white/15 rounded-lg p-6 text-center cursor-pointer hover:border-[#e9c349]/40 hover:bg-white/[0.02] transition"
                    >
                      {uploading ? (
                        <p className="text-white/40 text-xs">Uploading...</p>
                      ) : (
                        <>
                          <p className="text-white/40 text-xs mb-1">Click to upload image</p>
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
                <Field label="Image Alt Text" value={form.image_alt} onChange={(v) => setForm((f) => ({ ...f, image_alt: v }))} />

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#e9c349] text-[#0e1a13] font-semibold text-sm py-2.5 rounded-lg hover:bg-[#e9c349]/90 transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Package"}
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
          <p className="text-white/40 text-sm">Loading packages...</p>
        ) : packages.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-white/30 text-sm mb-4">No packages yet</p>
            <button
              onClick={startNew}
              className="px-5 py-2.5 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition"
            >
              Add your first package
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white/[0.03] border rounded-xl p-4 sm:p-5 ${pkg.active ? "border-white/5" : "border-red-500/10 opacity-60"}`}
              >
                <div className="flex gap-3 sm:gap-4 items-start">
                  {pkg.image_url && (
                    <img
                      src={pkg.image_url}
                      alt={pkg.image_alt}
                      className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] text-[#e9c349] font-mono">{pkg.number}</span>
                      <h3 className="font-medium text-white text-sm">{pkg.title}</h3>
                      {!pkg.active && (
                        <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">Hidden</span>
                      )}
                    </div>
                    <p className="text-xs text-white/50 mb-2 line-clamp-2">{pkg.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/40">
                      <span className="text-[#e9c349] font-medium text-sm">₹{pkg.price.toLocaleString("en-IN")}</span>
                      <span>{pkg.nights} nights</span>
                      {pkg.occupancy != null ? (
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full">{pkg.occupancy}-guest rate</span>
                      ) : (
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-300/70 px-2 py-0.5 rounded-full">No occupancy set</span>
                      )}
                      {pkg.features.length > 0 && (
                        <span className="hidden sm:inline truncate max-w-xs">{pkg.features.map((f) => f.label).join(" · ")}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions — separated below for mobile clarity */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-white/5 flex-wrap">
                  <button
                    onClick={() => startEdit(pkg)}
                    className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(pkg)}
                    className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition"
                  >
                    {pkg.active ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
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

function Field({
  label, value, onChange, type = "text", required = false, placeholder = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] text-white/40 mb-1 tracking-wide uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
      />
    </div>
  );
}
