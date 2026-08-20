import { supabaseAdmin } from "@/lib/supabase";
import {
  MIN_OCCUPANCY,
  MAX_OCCUPANCY,
  CHILD_DISCOUNT_RATE,
  validateRooms,
  type RoomInput,
} from "@/lib/pricingConstants";

export {
  MAX_ROOMS,
  MIN_OCCUPANCY,
  MAX_OCCUPANCY,
  MAX_PROPERTY_GUESTS,
  MAX_CHILDREN_PER_ROOM,
  CHILD_FREE_UNDER_AGE,
  CHILD_HALF_PRICE_MAX_AGE,
  CHILD_DISCOUNT_RATE,
  validateRooms,
} from "@/lib/pricingConstants";
export type { RoomInput } from "@/lib/pricingConstants";

export type BaseRate = { occupancy: number; pricePerPerson: number };

export type SeasonalRate = {
  id: string;
  label: string;
  start_date: string;
  end_date: string;
  rates: Record<string, number>;
  active: boolean;
};

export type NightBreakdown = {
  date: string;
  rate: number;
  seasonal: boolean;
  seasonLabel: string | null;
  childrenCharge: number;
};

export type RoomBreakdown = {
  occupancy: number;
  children5to10: number;
  childrenUnder5: number;
  nights: NightBreakdown[];
  subtotal: number;
};

export type PriceQuote = {
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: RoomBreakdown[];
  totalGuests: number;
  total: number;
};

export class PricingError extends Error {}

function enumerateNights(checkIn: string, checkOut: string): string[] {
  // Parse and iterate purely in UTC-based calendar-day terms so the result
  // never shifts with the server's local timezone offset.
  const dates: string[] = [];
  const cur = new Date(checkIn + "T00:00:00Z");
  const end = new Date(checkOut + "T00:00:00Z");
  while (cur < end) {
    dates.push(cur.toISOString().split("T")[0]);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

function seasonalRateFor(
  date: string,
  occupancy: number,
  seasonalRates: SeasonalRate[]
): { price: number; label: string } | null {
  for (const season of seasonalRates) {
    if (!season.active) continue;
    if (date < season.start_date || date > season.end_date) continue;
    const price = season.rates[String(occupancy)];
    if (price != null) return { price, label: season.label };
  }
  return null;
}

/**
 * Computes the price night-by-night per room: each night uses the active
 * seasonal rate covering that calendar date if one exists for that room's
 * occupancy, otherwise the base per-person rate × occupancy. This means the
 * rate depends only on the stay date, never the date the booking is made.
 *
 * Children aged 5–10 are charged CHILD_DISCOUNT_RATE of that night's per-head
 * tariff (the room's adult rate, divided by occupancy, doesn't change);
 * children under 5 stay free. Both age groups still count toward the
 * property's total-guest capacity.
 */
export function computeQuote(
  checkIn: string,
  checkOut: string,
  rooms: RoomInput[],
  baseRates: BaseRate[],
  seasonalRates: SeasonalRate[]
): PriceQuote {
  if (!checkIn || !checkOut || checkIn >= checkOut) {
    throw new PricingError("Check-out must be after check-in.");
  }
  const roomsError = validateRooms(rooms);
  if (roomsError) throw new PricingError(roomsError);

  const nightDates = enumerateNights(checkIn, checkOut);
  if (nightDates.length === 0) throw new PricingError("Stay must be at least one night.");

  const roomBreakdowns: RoomBreakdown[] = rooms.map((room) => {
    const base = baseRates.find((b) => b.occupancy === room.occupancy);
    if (!base) {
      throw new PricingError(`No base rate configured for ${room.occupancy}-guest occupancy.`);
    }
    const baseNightPrice = base.pricePerPerson * room.occupancy;
    const children5to10 = room.children5to10 ?? 0;
    const childrenUnder5 = room.childrenUnder5 ?? 0;

    const nights: NightBreakdown[] = nightDates.map((date) => {
      const season = seasonalRateFor(date, room.occupancy, seasonalRates);
      const perHeadRate = season ? season.price / room.occupancy : base.pricePerPerson;
      const childrenCharge = children5to10 * perHeadRate * CHILD_DISCOUNT_RATE;
      return season
        ? { date, rate: season.price, seasonal: true, seasonLabel: season.label, childrenCharge }
        : { date, rate: baseNightPrice, seasonal: false, seasonLabel: null, childrenCharge };
    });

    return {
      occupancy: room.occupancy,
      children5to10,
      childrenUnder5,
      nights,
      subtotal: nights.reduce((sum, n) => sum + n.rate + n.childrenCharge, 0),
    };
  });

  return {
    checkIn,
    checkOut,
    nights: nightDates.length,
    rooms: roomBreakdowns,
    totalGuests: rooms.reduce(
      (sum, r) => sum + r.occupancy + (r.children5to10 ?? 0) + (r.childrenUnder5 ?? 0),
      0
    ),
    total: roomBreakdowns.reduce((sum, r) => sum + r.subtotal, 0),
  };
}

export type UpcomingSeason = {
  id: string;
  label: string;
  start_date: string;
  end_date: string;
  rates: Record<string, number>;
};

/**
 * Seasons that are currently active or still to come (end_date >= today),
 * ordered soonest-first. Used to surface festive pricing on marketing pages
 * — the booking form's own quote always uses the authoritative night-by-night
 * lookup above, this is just for "heads up, rates differ on these dates".
 */
export async function fetchUpcomingSeasonalRates(): Promise<UpcomingSeason[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabaseAdmin
    .from("seasonal_rates")
    .select("id, label, start_date, end_date, rates")
    .eq("active", true)
    .gte("end_date", today)
    .order("start_date", { ascending: true });

  if (error) throw new PricingError(`Failed to load seasonal rates: ${error.message}`);
  return (data ?? []) as UpcomingSeason[];
}

/** Fetches current base rates + active seasonal rates and computes a quote. */
export async function quoteBooking(
  checkIn: string,
  checkOut: string,
  rooms: RoomInput[]
): Promise<PriceQuote> {
  const [{ data: packages, error: pkgErr }, { data: seasons, error: seasonErr }] = await Promise.all([
    supabaseAdmin.from("packages").select("occupancy, price").not("occupancy", "is", null),
    supabaseAdmin.from("seasonal_rates").select("*").eq("active", true),
  ]);

  if (pkgErr) throw new PricingError(`Failed to load base rates: ${pkgErr.message}`);
  if (seasonErr) throw new PricingError(`Failed to load seasonal rates: ${seasonErr.message}`);

  const baseRates: BaseRate[] = (packages ?? []).map((p) => ({
    occupancy: p.occupancy as number,
    pricePerPerson: p.price as number,
  }));

  return computeQuote(checkIn, checkOut, rooms, baseRates, (seasons ?? []) as SeasonalRate[]);
}
