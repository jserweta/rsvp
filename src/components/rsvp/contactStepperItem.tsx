import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Step } from '@stepperize/react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '../ui/label';

export const ContactStepperItem = ({ step }: { step: Step }) => {
  type AttendanceFormCurrentStepSchema = z.infer<typeof step.schema>;

  const { control } = useFormContext<AttendanceFormCurrentStepSchema>();

  return (
    <div className="grid gap-4">
      <FormField
        control={control}
        name={step.id + '_email'}
        render={({ field }) => (
          <FormItem>
            <Label>
              Chcielibyśmy wysłać Wam kilka wspomnień z naszego wesela. Podajcie
              proszę swój adres e-mail, jeśli macie ochotę je otrzymać.
            </Label>
            <FormControl>
              <Input
                placeholder="Wprowadź adres e-mail"
                {...field}
                value={field.value ?? ''}
                className="w-fit min-w-[250px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
