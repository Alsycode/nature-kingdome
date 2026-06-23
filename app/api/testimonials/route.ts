import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function isAdmin(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  let query = supabaseAdmin
    .from("testimonials")
    .select("id, quote, name, role, image_url, active, created_at")
    .order("created_at", { ascending: false });

  if (!isAdmin(req)) {
    query = query.eq("active", true);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { quote, name, role, image_url } = await req.json();
  if (!quote || !name || !role) {
    return NextResponse.json({ error: "Quote, name, and role are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .insert({ quote, name, role, image_url: image_url || "", active: true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
