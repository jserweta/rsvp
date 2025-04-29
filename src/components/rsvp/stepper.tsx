'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { submitInvitationForm } from '@/lib/actions/submitInvitationForm';
import { fetchInvitationStatusById } from '@/lib/data/fetchInvitationStatusById';
import { GuestRaw } from '@/lib/definitions';
import { InvitationStatus, menuKindsList } from '@/lib/enum-definitions';
import {
  ContactStepSchema,
  getGuestStepSchema,
} from '@/lib/schema/getGuestStepSchema';
import { hasConfirmedAttendance } from '@/lib/utils/hasConfirmedAttendance';
import { zodResolver } from '@hookform/resolvers/zod';
import { defineStepper, Step } from '@stepperize/react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { GoPerson } from 'react-icons/go';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { toast } from 'sonner';
import { z } from 'zod';
import { AdditionalInfoStepperItem } from './additionalInfoStepperItem';
import { PersonStepperItem } from './personStepperItem';

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  formSteps.push({
    id: 'additional_info',
    title: 'Dodatkowe informacje',
    schema: ContactStepSchema,
  });

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
        startTransition(async () => {
          const invitationStatus =
            await fetchInvitationStatusById(invitationId);

          if (invitationStatus === InvitationStatus.SUBMITTED) {
            router.push('/rsvp/success?status=submitted');
            return;
          }

          const formValues = form.getValues();
          await submitInvitationForm(formValues, invitationId);

          router.push(
            `/rsvp/success${hasConfirmedAttendance(formValues) ? '?status=confirmed' : ''}`
          );
        });
      } else {
        stepper.next();
      }
    } catch {
      toast.error('Wystapił błąd :/', {
        description:
          'Prosimy spróbować później lub skontaktować się z nami telefonicznie',
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
                    className={`flex size-10 items-center justify-center rounded-full transition-none  ${index <= currentIndex ? 'bg-primary text-primary-foreground shadow' : 'bg-secondary text-secondary-foreground shadow-sm'}`}
                  >
                    {step.id === 'contact' ? (
                      <HiOutlineEnvelope />
                    ) : (
                      <GoPerson />
                    )}
                  </div>
                  <span className="text-sm font-[600]">{step.title}</span>
                </li>
                <div className="flex min-h-[8px] gap-[calc(1rem+20px)]">
                  <div
                    className="flex justify-center"
                    style={{
                      paddingInlineStart: '1.25rem',
                    }}
                  >
                    {index < array.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className={`h-full w-[1px] ${
                          index <= currentIndex ? 'bg-foreground' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>

                  {stepper.current.id === step.id && (
                    <div className="my-4 flex-1">
                      {step.id === 'additional_info' ? (
                        <AdditionalInfoStepperItem
                          key={stepper.current.id}
                          step={stepper.current}
                          hasConfirmedAttendance={hasConfirmedAttendance(
                            form.getValues()
                          )}
                        />
                      ) : (
                        <PersonStepperItem
                          key={stepper.current.id}
                          needTransport={needTransport}
                          needAccommodation={needAccommodation}
                          menuKinds={menuKindsList}
                          step={stepper.current}
                        />
                      )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        <div className="space-y-4">
          <div className="flex justify-end gap-4">
            {!stepper.isFirst && (
              <Button
                variant="secondary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  stepper.prev();
                }}
                disabled={stepper.isFirst}
              >
                Wróć
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {stepper.isLast ? (
                isPending ? (
                  <>
                    {'Wyślij'} <AiOutlineLoading className="animate-spin" />
                  </>
                ) : (
                  'Wyślij'
                )
              ) : (
                'Dalej'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
