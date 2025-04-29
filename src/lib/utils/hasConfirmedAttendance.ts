import { AttendanceStatus } from '../enum-definitions';

export const hasConfirmedAttendance = (formValues: Record<string, string>) => {
  return Object.keys(formValues).some(
    (key) =>
      key.includes('_attendance') &&
      formValues[key] === AttendanceStatus.CONFIRMED
  );
};
