"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminHeaders, getStoredToken } from "@/lib/adminAuth";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export default function AdminBlogList() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-serif text-white">Nature Kingdom Admin</h1>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-white/50 hover:text-white transition">Bookings</Link>
            <Link href="/admin/packages" className="text-white/50 hover:text-white transition">Packages</Link>
            <span className="text-[#e9c349]">Blog</span>
          </nav>
        </div>
        <Link href="/admin/blog/new">
          <button className="px-4 py-2 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition">
            + New Post
          </button>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif">Blog Posts</h2>
          <p className="text-xs text-white/30">{posts.length} total</p>
        </div>

        {loading ? (
          <p className="text-white/40 text-sm">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-white/30 text-sm mb-4">No blog posts yet</p>
            <Link href="/admin/blog/new">
              <button className="px-5 py-2.5 bg-[#e9c349] text-[#0e1a13] text-xs font-semibold rounded-lg hover:bg-[#e9c349]/90 transition">
                Write your first post
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/[0.03] border border-white/5 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-medium text-white truncate">{post.title}</p>
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
                  <div className="flex items-center gap-3 text-xs text-white/30 flex-wrap">
                    <span>/blog/{post.slug}</span>
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
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
