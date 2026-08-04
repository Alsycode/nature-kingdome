import { NextRequest, NextResponse } from "next/server";
import { quoteBooking, PricingError, type RoomInput } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { check_in, check_out, rooms } = body as {
    check_in?: string;
    check_out?: string;
    rooms?: RoomInput[];
  };

  if (!check_in || !check_out || !rooms) {
    return NextResponse.json({ error: "check_in, check_out, and rooms are required" }, { status: 400 });
  }

  try {
    const quote = await quoteBooking(check_in, check_out, rooms);
    return NextResponse.json(quote);
  } catch (err) {
    if (err instanceof PricingError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("[pricing/quote] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to compute price quote" }, { status: 500 });
  }
}
