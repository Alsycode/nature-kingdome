// Pure constants + validation shared by client components (booking form, admin
// seasonal-rates page) and server code (lib/pricing.ts). Must never import
// anything server-only (e.g. supabaseAdmin) — client bundles import this file.

export const MAX_ROOMS = 4;
export const MIN_OCCUPANCY = 1;
export const MAX_OCCUPANCY = 5;
export const MAX_PROPERTY_GUESTS = 20;
export const MAX_CHILDREN_PER_ROOM = 4;

// Child pricing bands: under CHILD_FREE_UNDER_AGE stays free, from there up to
// (and including) CHILD_HALF_PRICE_MAX_AGE is charged CHILD_DISCOUNT_RATE of
// the per-head tariff, above that age it's a full adult.
export const CHILD_FREE_UNDER_AGE = 5;
export const CHILD_HALF_PRICE_MAX_AGE = 10;
export const CHILD_DISCOUNT_RATE = 0.5;

export type RoomInput = { occupancy: number; children5to10?: number; childrenUnder5?: number };

export function validateRooms(rooms: RoomInput[]): string | null {
  if (!Array.isArray(rooms) || rooms.length === 0) return "At least one room is required.";
  if (rooms.length > MAX_ROOMS) return `A maximum of ${MAX_ROOMS} rooms is available.`;
  for (const room of rooms) {
    if (
      !Number.isInteger(room.occupancy) ||
      room.occupancy < MIN_OCCUPANCY ||
      room.occupancy > MAX_OCCUPANCY
    ) {
      return `Each room must have between ${MIN_OCCUPANCY} and ${MAX_OCCUPANCY} guests.`;
    }
    for (const count of [room.children5to10 ?? 0, room.childrenUnder5 ?? 0]) {
      if (!Number.isInteger(count) || count < 0 || count > MAX_CHILDREN_PER_ROOM) {
        return `Each room can have at most ${MAX_CHILDREN_PER_ROOM} children per age group.`;
      }
    }
  }
  const totalGuests = rooms.reduce(
    (sum, r) => sum + r.occupancy + (r.children5to10 ?? 0) + (r.childrenUnder5 ?? 0),
    0
  );
  if (totalGuests > MAX_PROPERTY_GUESTS) return `Maximum property capacity is ${MAX_PROPERTY_GUESTS} guests.`;
  return null;
}
