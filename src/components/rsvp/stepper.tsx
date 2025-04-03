'use client';

import { defineStepper, Step } from '@stepperize/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { getGuestStepSchema } from '@/lib/schema/getGuestStepSchema';
import { submitInvitationForm } from '@/lib/actions/submitInvitationForm';
import { toast } from 'sonner';
import { StepperItem } from './stepperItem';
import { GuestRaw } from '@/lib/definitions';
import { menuKindsList } from '@/lib/enum-definitions';

export const Stepper = ({
  invitationMembers,
  needTransport,
  needAccommodation,
  invitationId,
}: {
  invitationMembers: GuestRaw[];
  needTransport: boolean;
  needAccommodation: boolean;
  invitationId: string;
}) => {
  const formSteps: Step[] = invitationMembers.map((item) => ({
    id: item.guestId,
    title: `${item.name} ${item.surname}`,
    schema: getGuestStepSchema(
      item.guestId,
      item.name.includes('towarzysząca'),
      menuKindsList,
      needAccommodation,
      needTransport
    ),
  }));

  const { useStepper, steps, utils } = defineStepper(...formSteps);
  const stepper = useStepper();

  const currentIndex = utils.getIndex(stepper.current.id);

  const attendanceFormCurrentStepSchema = stepper.current.schema;
  type AttendanceFormCurrentStepSchema = z.infer<
    typeof attendanceFormCurrentStepSchema
  >;
  const form = useForm<AttendanceFormCurrentStepSchema>({
    mode: 'onTouched',
    resolver: zodResolver(attendanceFormCurrentStepSchema),
  });

  const onSubmit = async () => {
    try {
      if (stepper.isLast) {
        await submitInvitationForm(form.getValues(), invitationId);
        toast.success('Thank you!', {
          description: 'See you at the party ;)',
        });

        stepper.reset();
        form.reset();
      } else {
        stepper.next();
      }
    } catch {
      toast.error('Form submission failed.', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full space-y-6 bg-white/20 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <nav aria-label="Lista obecności" className="group my-4">
          <ol className="flex flex-col gap-2" aria-orientation="vertical">
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex flex-shrink-0 items-center gap-4">
                  <div
                    role="tab"
                    aria-current={
                      stepper.current.id === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className={`flex size-10 items-center justify-center rounded-full leading-none ${index <= currentIndex ? 'bg-foreground text-white' : 'border border-white'} `}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-[600]">{step.title}</span>
                </li>
                <div className="flex min-h-[8px] gap-4">
                  {index < array.length - 1 && (
                    <div
                      className="flex justify-center"
                      style={{
                        paddingInlineStart: '1.25rem',
                      }}
                    >
                      <Separator
                        orientation="vertical"
                        className={`h-full w-[1px] ${
                          index <= currentIndex ? 'bg-foreground' : 'bg-muted'
                        }`}
                      />
                    </div>
                  )}
                  {stepper.current.id === step.id && (
                    <div className="my-4 flex-1">
                      <StepperItem
                        key={stepper.current.id}
                        needTransport={needTransport}
                        needAccommodation={needAccommodation}
                        menuKinds={menuKindsList}
                        step={stepper.current}
                      />
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        <div className="space-y-4">
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="rounded-none border-white"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                stepper.prev();
              }}
              disabled={stepper.isFirst}
            >
              Wróć
            </Button>
            <Button type="submit" className="b rounded-none">
              {stepper.isLast ? 'Wyślij' : 'Dalej'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
