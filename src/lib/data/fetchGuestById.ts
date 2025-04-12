import { Guest } from '../definitions';
import { sql } from '../utils/db';

export async function fetchGuestById(id: string) {
  try {
    const data = await sql<Guest[]>`
      SELECT
        guests.guest_id,
        guests.name,
        guests.surname,
        guests.accommodation,
        guests.transport,
        guests.menu_kind,
        guests.attendance
      FROM public.guests
      WHERE guests.guest_id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch guest.');
  }
}
