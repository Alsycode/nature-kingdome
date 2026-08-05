import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("packages")
    .select("*")
    .order("number");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();

  const body = await req.json();
  const { number, title, description, price, nights, occupancy, features, image_url, image_alt } = body;

  if (!title || !price || !nights) {
    return NextResponse.json({ error: "title, price, and nights are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("packages")
    .insert({ number, title, description, price, nights, occupancy: occupancy ?? null, features, image_url, image_alt })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/");
  revalidatePath("/stay-info/rates");
  return NextResponse.json(data, { status: 201 });
}

function isAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
