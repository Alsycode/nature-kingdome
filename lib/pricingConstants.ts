// Pure constants + validation shared by client components (booking form, admin
// seasonal-rates page) and server code (lib/pricing.ts). Must never import
// anything server-only (e.g. supabaseAdmin) — client bundles import this file.

export const MAX_ROOMS = 4;
export const MIN_OCCUPANCY = 1;
export const MAX_OCCUPANCY = 5;
export const MAX_PROPERTY_GUESTS = 20;

export type RoomInput = { occupancy: number };

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
  }
  const totalGuests = rooms.reduce((sum, r) => sum + r.occupancy, 0);
  if (totalGuests > MAX_PROPERTY_GUESTS) return `Maximum property capacity is ${MAX_PROPERTY_GUESTS} guests.`;
  return null;
}
