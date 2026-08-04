"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminHeaders, getStoredToken, clearStoredToken } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";
import Pagination from "@/components/admin/Pagination";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Bookings" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/seasonal-rates", label: "Seasonal Rates" },
  { href: "/admin/blog", label: "Blog", active: true },
  { href: "/admin/testimonials", label: "Testimonials" },
];

const PAGE_SIZE = 10;

export default function AdminBlogList() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/blog", { headers: adminHeaders() });
    if (res.status === 401) { router.push("/admin"); return; }
    setPosts(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!getStoredToken()) { router.push("/admin"); return; }
    fetchPosts();
  }, [fetchPosts, router]);

  useEffect(() => { setPage(1); }, [search, statusFilter, categoryFilter]);

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[];

  const filteredPosts = posts.filter((p) => {
    if (statusFilter === "published" && !p.published) return false;
    if (statusFilter === "draft" && p.published) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const paginatedPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasActiveFilters = search || statusFilter !== "all" || categoryFilter !== "all";

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  }

  async function togglePublish(post: Post) {
    await fetch(`/api/blog/${post.id}`, {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE", headers: adminHeaders() });
    fetchPosts();
  }

  return (
    <div className="min-h-screen bg-[#0e1a13] text-white">
      <AdminNav
        items={NAV_ITEMS}
        rightSlot={
          <>
            <Link href="/admin/blog/new">
              <button className="px-4 py-2 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition w-full sm:w-auto">
                + New Post
              </button>
            </Link>
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
          <h2 className="text-xl font-serif">Blog Posts</h2>
          <p className="text-xs text-white/30">{posts.length} total</p>
        </div>

        {loading ? (
          <p className="text-white/40 text-sm">Loading posts...</p>
        ) : (
          <>
            {/* ── Filters ── */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-5 space-y-3">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title…"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#e9c349]/40"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">✕</button>
                )}
              </div>

              {/* Status + Category */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Status pills */}
                <div className="flex gap-1.5 flex-wrap">
                  {(["all", "published", "draft"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition capitalize ${
                        statusFilter === s
                          ? "bg-[#e9c349] text-[#0e1a13]"
                          : "bg-white/5 text-white/50 hover:bg-white/10"
                      }`}
                    >
                      {s === "all" ? "All" : s === "published" ? "Published" : "Draft"}
                      <span className="ml-1 opacity-60">
                        ({s === "all"
                          ? posts.length
                          : s === "published"
                          ? posts.filter((p) => p.published).length
                          : posts.filter((p) => !p.published).length})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Category dropdown */}
                {categories.length > 0 && (
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 focus:outline-none focus:border-[#e9c349]/40 [color-scheme:dark] sm:ml-auto"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                )}
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <p className="text-xs text-white/40">{filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""}</p>
                  <button onClick={resetFilters} className="text-xs text-[#e9c349]/70 hover:text-[#e9c349] transition">
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* ── Post List ── */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
                {posts.length === 0 ? (
                  <>
                    <p className="text-white/30 text-sm mb-4">No blog posts yet</p>
                    <Link href="/admin/blog/new">
                      <button className="px-5 py-2.5 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition">
                        Write your first post
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-white/30 text-sm">No posts match your filters.</p>
                    {hasActiveFilters && (
                      <button onClick={resetFilters} className="mt-3 text-xs text-[#e9c349]/70 hover:text-[#e9c349] transition">
                        Clear filters
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-2 sm:space-y-3">
                  {paginatedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white/[0.03] border border-white/5 rounded-xl p-4 sm:p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        {/* Post info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-white text-sm truncate">{post.title}</p>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                                post.published
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-white/5 text-white/40"
                              }`}
                            >
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
                            <span className="font-mono">/blog/{post.slug}</span>
                            {post.category && (
                              <>
                                <span>·</span>
                                <span className="text-[#e9c349]/60">{post.category}</span>
                              </>
                            )}
                            {post.published_at && (
                              <>
                                <span>·</span>
                                <span>
                                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                                    day: "numeric", month: "short", year: "numeric",
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                          <button
                            onClick={() => togglePublish(post)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition ${
                              post.published
                                ? "bg-white/5 text-white/50 hover:bg-white/10"
                                : "bg-green-600/20 text-green-300 hover:bg-green-600/30"
                            }`}
                          >
                            {post.published ? "Unpublish" : "Publish"}
                          </button>
                          <Link href={`/admin/blog/${post.id}`}>
                            <button className="px-3 py-1.5 bg-white/5 text-white/50 text-xs rounded-lg hover:bg-white/10 transition">
                              Edit
                            </button>
                          </Link>
                          {post.published && (
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                              <button className="px-3 py-1.5 bg-white/5 text-white/50 text-xs rounded-lg hover:bg-white/10 transition">
                                View ↗
                              </button>
                            </a>
                          )}
                          <button
                            onClick={() => deletePost(post.id)}
                            className="px-3 py-1.5 bg-white/5 text-white/30 text-xs rounded-lg hover:bg-red-600/20 hover:text-red-300 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={filteredPosts.length}
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
