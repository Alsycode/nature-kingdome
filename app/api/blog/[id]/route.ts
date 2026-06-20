import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function isAdmin(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

// Public: fetch by slug. Admin: fetch by id.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try slug first (public use), then id (admin use)
  let { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", id)
    .single();

  if (!data) {
    ({ data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single());
  }

  if (error || !data) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  // Set published_at when first publishing
  if (body.published === true) {
    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("published, published_at")
      .eq("id", id)
      .single();

    if (existing && !existing.published && !existing.published_at) {
      body.published_at = new Date().toISOString();
    }
  }

  body.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
