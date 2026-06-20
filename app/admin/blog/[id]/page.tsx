"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminHeaders, getStoredToken } from "@/lib/adminAuth";
import BlogEditor, { PostForm } from "../BlogEditor";

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [post, setPost] = useState<(PostForm & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getStoredToken()) { router.push("/admin"); return; }

    fetch(`/api/blog/${id}`, { headers: adminHeaders() })
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      });
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1a13] flex items-center justify-center">
        <p className="text-white/30 text-sm">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0e1a13] flex items-center justify-center">
        <p className="text-red-400 text-sm">Post not found.</p>
      </div>
    );
  }

  return <BlogEditor mode="edit" initialData={post} />;
}
