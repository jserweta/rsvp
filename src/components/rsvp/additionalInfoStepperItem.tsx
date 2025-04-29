import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Step } from '@stepperize/react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export const AdditionalInfoStepperItem = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  step,
  hasConfirmedAttendance,
}: {
  step: Step;
  hasConfirmedAttendance: boolean;
}) => {
  type AttendanceFormCurrentStepSchema = z.infer<typeof step.schema>;

  const { control } = useFormContext<AttendanceFormCurrentStepSchema>();

  return (
    <div className="grid gap-6">
      {hasConfirmedAttendance && (
        <FormField
          control={control}
          name={'contact_email'}
          render={({ field }) => (
            <FormItem>
              <Label>
                Chcielibyśmy wysłać Wam kilka wspomnień z naszego wesela.
                Podajcie proszę swój adres e-mail, jeśli macie ochotę je
                otrzymać.
              </Label>
              <FormControl>
                <Input
                  placeholder="Wprowadź adres e-mail"
                  {...field}
                  value={field.value ?? ''}
                  className="w-full max-w-[250px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name={'additional_info'}
        render={({ field }) => (
          <FormItem>
            <Label>Ważne informacje, które chcesz nam przekazać</Label>
            <FormControl>
              <Textarea
                placeholder="Twoja wiadomość"
                {...field}
                value={field.value ?? ''}
                className="w-full max-w-[250px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
