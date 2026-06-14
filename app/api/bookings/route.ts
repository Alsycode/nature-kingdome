import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendClientNotification } from "@/lib/email";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let query = supabaseAdmin
    .from("bookings")
    .select("*, packages(title)")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { guest_name, email, phone, check_in, check_out, package_id, package_title, guests } = body;

  if (!guest_name || !email || !phone || !check_in || !check_out) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Check for overlapping confirmed/pending bookings
  const { data: conflicts } = await supabaseAdmin
    .from("bookings")
    .select("id")
    .neq("status", "cancelled")
    .lt("check_in", check_out)
    .gt("check_out", check_in);

  if (conflicts && conflicts.length > 0) {
    return NextResponse.json(
      { error: "These dates are no longer available. Please choose different dates." },
      { status: 409 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      guest_name,
      email,
      phone,
      check_in,
      check_out,
      package_id: package_id || null,
      package_title: package_title || "General Stay",
      guests: guests || 1,
      status: "pending_payment",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Notify client — fire and forget, don't block response
  sendClientNotification(data).catch((err) => {
    console.error("[bookings] Failed to send client notification email:", err);
  });

  return NextResponse.json(data, { status: 201 });
}

function isAdmin(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
