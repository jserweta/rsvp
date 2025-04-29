import { z } from 'zod';
import { TRANSPORT_SELECT_VALUES } from '../data/transportSelectValues';
import { AttendanceStatus, MenuKinds } from '../enum-definitions';

export const getGuestStepSchema = (
  guestId: string,
  isCompanion: boolean,
  menuKinds: MenuKinds[],
  needAccommodation: boolean,
  needTransport: boolean
) => {
  const memberSchema = z
    .object({
      [`${guestId}_attendance`]: z.nativeEnum(AttendanceStatus, {
        required_error: 'Będziesz obecny?',
        invalid_type_error: 'Będziesz obecny?',
      }),
      [`${guestId}_menuKind`]: z.nativeEnum(MenuKinds).optional(),
      [`${guestId}_transport`]: z.string().optional(),
      [`${guestId}_accommodation`]: z.string().optional(),
      ...(isCompanion && {
        [`${guestId}_name`]: z.string().optional(),
        [`${guestId}_surname`]: z.string().optional(),
      }),
    })
    .refine(
      (data) => {
        if (data[`${guestId}_attendance`] === AttendanceStatus.CONFIRMED) {
          return (
            data[`${guestId}_menuKind`] &&
            menuKinds.includes(data[`${guestId}_menuKind`]! as MenuKinds)
          );
        }
        return true;
      },
      {
        message: 'Wybierz rodzaj menu.',
        path: [`${guestId}_menuKind`],
      }
    )
    .refine(
      (data) => {
        if (
          data[`${guestId}_attendance`] === AttendanceStatus.CONFIRMED &&
          needAccommodation
        ) {
          return (
            data[`${guestId}_accommodation`] &&
            guestId &&
            ['yes', 'no'].includes(data[`${guestId}_accommodation`]!)
          );
        }
        return true;
      },
      {
        message: 'Zdecyduj, czy potrzebujesz noclegu.',
        path: [`${guestId}_accommodation`],
      }
    )
    .refine(
      (data) => {
        if (
          data[`${guestId}_attendance`] === AttendanceStatus.CONFIRMED &&
          needTransport
        ) {
          return (
            data[`${guestId}_transport`] &&
            guestId &&
            TRANSPORT_SELECT_VALUES.includes(data[`${guestId}_transport`]!)
          );
        }
        return true;
      },
      {
        message: 'Zdecyduj, czy potrzebujesz transportu.',
        path: [`${guestId}_transport`],
      }
    );

  return memberSchema;
};

export const ContactStepSchema = z.object({
  contact_email: z.union([
    z.literal(''),
    z.string().email({ message: 'Podaj poprawny adres email' }),
  ]),
  additional_info: z.string().optional(),
});
