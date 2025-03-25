import { sql } from "../db";
import { AttendanceStatus, InvitationStatus } from "../enum-definitions";

export async function fetchDashboardSummary() {
  try {
    const guestsCount = sql`
      SELECT COUNT(*) 
      FROM guests
    `;

    const confirmedGuestsCount = sql`
      SELECT COUNT(*)
      FROM guests 
      WHERE attendance = ${AttendanceStatus.CONFIRMED}
    `;

    const confirmedAccommodationCount = sql`
      SELECT COUNT(*) FROM guests 
      WHERE attendance = ${AttendanceStatus.CONFIRMED} 
        AND accommodation = TRUE
    `;

    const declinedGuestsCount = sql`
      SELECT COUNT(*)
      FROM guests
      WHERE attendance = ${AttendanceStatus.DECLINED}
    `;

    const invitationsCount = sql`
      SELECT COUNT(*)
      FROM invitations
    `;

    const invitationsSubmittedCount = sql`
      SELECT COUNT(*) 
      FROM invitations 
      WHERE status = ${InvitationStatus.SUBMITTED}
    `;

    const [
      [{ count: guests }],
      [{ count: confirmedGuests }],
      [{ count: confirmedAccommodations }],
      [{ count: declinedGuests }],
      [{ count: invitations }],
      [{ count: invitationsSubmitted }],
    ] = await Promise.all([
      guestsCount,
      confirmedGuestsCount,
      confirmedAccommodationCount,
      declinedGuestsCount,
      invitationsCount,
      invitationsSubmittedCount,
    ]);

    const totalNumberOfGuests = Number(guests ?? "0");
    const totalConfirmedGuests = Number(confirmedGuests ?? "0");
    const totalConfirmedAccommodations = Number(confirmedAccommodations ?? "0");
    const totalDeclinedGuests = Number(declinedGuests ?? "0");
    const totalInvitations = Number(invitations ?? "0");
    const totalInvitationsSubmissions = Number(invitationsSubmitted ?? "0");

    return {
      totalNumberOfGuests,
      totalConfirmedGuests,
      totalConfirmedAccommodations,
      totalDeclinedGuests,
      totalInvitations,
      totalInvitationsSubmissions,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}
