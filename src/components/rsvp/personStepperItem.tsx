import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ATTENDANCE_SELECT_VALUES } from '@/lib/data/attendanceSelectValues';
import { TRANSPORT_SELECT_VALUES } from '@/lib/data/transportSelectValues';
import { AttendanceStatus, attendanceStatusList } from '@/lib/enum-definitions';
import { Step } from '@stepperize/react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const PersonStepperItem = ({
  needTransport,
  needAccommodation,
  menuKinds,
  step,
}: {
  needTransport: boolean;
  needAccommodation: boolean;
  menuKinds: string[];
  step: Step;
}) => {
  type AttendanceFormCurrentStepSchema = z.infer<typeof step.schema>;

  const { control, watch, resetField, setValue } =
    useFormContext<AttendanceFormCurrentStepSchema>();

  return (
    <div className="grid gap-6">
      <FormField
        control={control}
        name={step.id + '_attendance'}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex flex-col gap-2">
              <Label className="text-start text-sm">
                Czy dołączysz do nas w tym wyjątkowym dniu?
              </Label>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === AttendanceStatus.DECLINED) {
                      resetField(`${step.id}_menuKind`);
                      resetField(`${step.id}_transport`);
                      resetField(`${step.id}_accommodation`);
                      resetField(`${step.id}_name`, { defaultValue: '' });
                      resetField(`${step.id}_surname`, { defaultValue: '' });
                    }
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full max-w-[250px]">
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendanceStatusList.map(
                      (status) =>
                        status !== AttendanceStatus.PENDING && (
                          <SelectItem key={status} value={status}>
                            {status === AttendanceStatus.CONFIRMED
                              ? ATTENDANCE_SELECT_VALUES.confirmed
                              : ATTENDANCE_SELECT_VALUES.declined}
                          </SelectItem>
                        )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={step.id + '_menuKind'}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex flex-col gap-2">
              <Label className="text-start text-sm">
                Jakie menu preferujesz?
              </Label>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? ''}
                  value={
                    watch(step.id + '_attendance') === AttendanceStatus.DECLINED
                      ? ''
                      : field.value
                  }
                  disabled={
                    watch(step.id + '_attendance') !==
                    AttendanceStatus.CONFIRMED
                  }
                >
                  <SelectTrigger className="w-full max-w-[250px]">
                    <SelectValue placeholder="Wybierz rodzaj menu" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuKinds &&
                      menuKinds.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {needTransport && (
        <FormField
          control={control}
          name={step.id + '_transport'}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col gap-2">
                <Label className="text-start text-sm">
                  Czy potrzebujesz transportu?
                </Label>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                    value={
                      watch(step.id + '_attendance') ===
                      AttendanceStatus.DECLINED
                        ? ''
                        : field.value
                    }
                    disabled={
                      watch(step.id + '_attendance') !==
                      AttendanceStatus.CONFIRMED
                    }
                  >
                    <SelectTrigger className="w-full max-w-[250px]">
                      <SelectValue placeholder="Wybierz" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSPORT_SELECT_VALUES.map((item, idx) => (
                        <SelectItem key={`${item}_${idx}`} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {needAccommodation && (
        <FormField
          control={control}
          name={step.id + '_accommodation'}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col gap-2">
                <Label className="text-start text-sm">
                  Czy potrzebujesz noclegu?
                </Label>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={
                      watch(step.id + '_attendance') ===
                      AttendanceStatus.DECLINED
                        ? ''
                        : field.value
                    }
                    disabled={
                      watch(step.id + '_attendance') !==
                      AttendanceStatus.CONFIRMED
                    }
                  >
                    <SelectTrigger className="w-full max-w-[250px]">
                      <SelectValue placeholder="Wybierz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="no-0" value={'no'}>
                        Nie
                      </SelectItem>
                      <SelectItem key="yes-1" value={'yes'}>
                        Tak
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {step.title.includes('towarzysząca') &&
        watch(step.id + '_attendance') === AttendanceStatus.CONFIRMED && (
          <div className="flex flex-col gap-2">
            <Label>
              Jeśli już wiesz, kto będzie Ci towarzyszyć, podaj imię i nazwisko
            </Label>
            <div className="flex flex-row gap-2">
              <FormField
                control={control}
                name={step.id + '_name'}
                render={({ field }) => (
                  <FormItem>
                    {/* <Label>Imię</Label> */}
                    <FormControl>
                      <Input
                        placeholder="Imię"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={step.id + '_surname'}
                render={({ field }) => (
                  <FormItem>
                    {/* <Label>Nazwisko</Label> */}
                    <FormControl>
                      <Input
                        placeholder="Nazwisko"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
    </div>
  );
};
