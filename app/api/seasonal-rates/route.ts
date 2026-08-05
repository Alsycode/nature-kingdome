import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { MIN_OCCUPANCY, MAX_OCCUPANCY } from "@/lib/pricingConstants";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("seasonal_rates")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();

  const body = await req.json();
  const { label, start_date, end_date, rates } = body;

  const validationError = validate(label, start_date, end_date, rates);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("seasonal_rates")
    .insert({ label, start_date, end_date, rates, active: body.active ?? true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/");
  revalidatePath("/stay-info/rates");
  return NextResponse.json(data, { status: 201 });
}

function validate(label: string, start_date: string, end_date: string, rates: Record<string, number>) {
  if (!label || !start_date || !end_date) return "label, start_date, and end_date are required";
  if (end_date < start_date) return "end_date must not be before start_date";
  if (!rates || typeof rates !== "object") return "rates is required";
  for (let occ = MIN_OCCUPANCY; occ <= MAX_OCCUPANCY; occ++) {
    const price = rates[String(occ)];
    if (typeof price !== "number" || price <= 0) {
      return `A price for ${occ}-guest occupancy is required`;
    }
  }
  return null;
}

function isAdmin(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
