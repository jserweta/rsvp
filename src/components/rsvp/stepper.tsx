"use client";

import { defineStepper, Step } from "@stepperize/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { getGuestStepSchema } from "@/lib/schema/getGuestStepSchema";
import { submitInvitationForm } from "@/lib/actions/submitInvitationForm";
import { toast } from "sonner";
import { StepperItem } from "./stepperItem";
import { GuestRaw } from "@/lib/definitions";
import { menuKindsList } from "@/lib/enum-definitions";

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
      item.name.includes("towarzysząca"),
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
    mode: "onTouched",
    resolver: zodResolver(attendanceFormCurrentStepSchema),
  });

  const onSubmit = async () => {
    try {
      if (stepper.isLast) {
        await submitInvitationForm(form.getValues(), invitationId);
        toast.success("Thank you!", {
          description: "See you at the party ;)",
        });

        stepper.reset();
        form.reset();
      } else {
        stepper.next();
      }
    } catch {
      toast.error("Form submission failed.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-6 border border-black w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-lg font-medium">RSVP</h2>

        <nav aria-label="Lista obecności" className="group my-4">
          <ol className="flex flex-col gap-2" aria-orientation="vertical">
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    variant={index <= currentIndex ? "default" : "secondary"}
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    // onClick={async (e) => {
                    //   e.preventDefault();
                    //   const valid = await form.trigger();
                    //   if (!valid) return;
                    //   if (index - currentIndex > 1) return;
                    //   stepper.goTo(step.id);
                    // }}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.title}</span>
                </li>
                <div className="flex gap-4 min-h-[8px]">
                  {index < array.length - 1 && (
                    <div
                      className="flex justify-center"
                      style={{
                        paddingInlineStart: "1.25rem",
                      }}
                    >
                      <Separator
                        orientation="vertical"
                        className={`w-[1px] h-full ${
                          index < currentIndex ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    </div>
                  )}
                  {stepper.current.id === step.id && (
                    <div className="flex-1 my-4">
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
            <Button type="submit">{stepper.isLast ? "Wyślij" : "Dalej"}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
