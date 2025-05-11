'use server';

import { Guest } from '@/lib/definitions';
import { TRANSPORT_SELECT_VALUES } from '../data/transportSelectValues';
import {
  AttendanceStatus,
  InvitationStatus,
  MenuKinds,
} from '../enum-definitions';
import { sql } from '../utils/db';

export const submitInvitationForm = async (
  formValues: Record<string, string>,
  invitationId: string
) => {
  const contactEmail = formValues.contact_email ?? '';
  const additionalInfo = formValues.additional_info ?? '';
  delete formValues.contact_email;
  delete formValues.additional_info;

  const groupedData = Object.entries(formValues).reduce(
    (acc, [key, value]) => {
      const [guestId, field] = key.split('_', 2);
      acc[guestId] = acc[guestId] || { guestId };

      switch (field) {
        case 'attendance':
          acc[guestId].attendance = value as AttendanceStatus;
          break;
        case 'menuKind':
          const selectedMenuKind = value === '' ? MenuKinds.STANDARDOWE : value;
          acc[guestId].menuKind = selectedMenuKind as MenuKinds;
          break;
        case 'accommodation':
          acc[guestId].accommodation = value === 'yes' ? true : false;
          break;
        case 'transport':
          const selectedTransportVariant =
            value === '' ? TRANSPORT_SELECT_VALUES[0] : value;

          acc[guestId].transport = selectedTransportVariant;
          break;
        case 'name':
          acc[guestId].name = value === '' ? 'os. towarzysząca' : value;
          break;
        case 'surname':
          acc[guestId].surname = value;
          break;
        default:
          break;
      }

      return acc;
    },
    {} as Record<string, Guest>
  );

  try {
    await sql.begin(async (sql) => {
      const queries = Object.values(groupedData).map(async (guest) => {
        const keys = Object.keys(guest).filter(
          (key) => key !== 'guestId'
        ) as (keyof Guest)[];

        return sql`
          UPDATE guests 
          SET ${sql(guest, keys)} 
          WHERE guest_id = ${guest.guestId}
        `;
      });

      queries.push(
        sql`
          UPDATE invitations 
          SET 
          status = ${InvitationStatus.SUBMITTED}
          ${contactEmail ? sql`, contact_email = ${contactEmail}` : sql``}
          ${additionalInfo ? sql`, additional_info = ${additionalInfo}` : sql``}
          WHERE invitation_id = ${invitationId}
        `
      );

      await Promise.all(queries);
    });

    console.log('Data successfully updated in the database.');
  } catch (error) {
    console.error('Error updating data in the database:', error);
    throw new Error('Transaction failed, no updates were applied.');
  }
};
