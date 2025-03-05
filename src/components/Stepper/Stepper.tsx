"use client";

import { defineStepper, Step } from "@stepperize/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import React from "react";
import { Separator } from "../ui/separator";
import { StepperItem } from "../StepperItem/StepperItem";
import { PersonIdentity } from "@/types/person";
import { z } from "zod";
import { Form } from "../ui/form";
import { generateSchemaForMember } from "@/lib/schema";
import { submitFormDataToDb } from "@/lib/data";
import { toast } from "sonner";

export const Stepper = ({
  groupMembers,
  needAccommodation,
  menuKinds,
  groupId,
}: {
  groupMembers: PersonIdentity[];
  needAccommodation: boolean;
  menuKinds: string[];
  groupId: string;
}) => {
  const formSteps: Step[] = groupMembers.map((item) => ({
    id: item.personId,
    title: `${item.name} ${item.surname}`,
    schema: generateSchemaForMember(
      item.personId,
      item.name.includes("towarzysząca"),
      menuKinds
    ),
  }));

  const { useStepper, steps, utils } = defineStepper(...formSteps);
  const stepper = useStepper();

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
        await submitFormDataToDb(form.getValues(), groupId);
        toast.success("Thank you!", {
          description: "See you at the party ;)",
        });

        stepper.reset();
        form.reset();
      } else {
        stepper.next();
      }
    } catch (error) {
      toast.error("Form submission failed.", {
        description: "Please try again later.",
      });
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-6 border rounded-lg w-[650px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">RSVP</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {currentIndex + 1} of {steps.length}
            </span>
            <div />
          </div>
        </div>

        <nav aria-label="Lista obecności" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar"
            aria-orientation="horizontal"
          >
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
                    onClick={async () => {
                      const valid = await form.trigger();
                      //must be validated
                      if (!valid) return;
                      //can't skip steps forwards but can go back anywhere if validated
                      if (index - currentIndex > 1) return;
                      stepper.goTo(step.id);
                    }}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.title}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${
                      index < currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          <StepperItem
            key={stepper.current.id}
            needAccommodation={needAccommodation}
            menuKinds={menuKinds}
            step={stepper.current}
          />

          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={async () => {
                const valid = await form.trigger();
                if (!valid) return;
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
