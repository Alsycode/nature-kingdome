import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Returns all booked date ranges so the calendar can grey them out
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("check_in, check_out")
    .neq("status", "cancelled");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Expand ranges into individual blocked dates
  const blocked: string[] = [];
  for (const booking of data ?? []) {
    const start = new Date(booking.check_in);
    const end = new Date(booking.check_out);
    const current = new Date(start);
    while (current < end) {
      blocked.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
  }

  // Deduplicate
  return NextResponse.json([...new Set(blocked)]);
}
