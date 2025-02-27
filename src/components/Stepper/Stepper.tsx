"use client";

import { defineStepper, Step } from "@stepperize/react";
import { Button } from "../ui/button";
import React from "react";
import { Separator } from "../ui/separator";
import { StepperItem } from "../StepperItem/StepperItem";
import { Person } from "@/types/person";

export const Stepper = ({
  groupMembers,
  needAccommodation,
  menuKinds,
}: {
  groupMembers: Person[];
  needAccommodation: boolean;
  menuKinds: string[];
}) => {
  const formSteps: Step[] = groupMembers.map((item, index) => ({
    id: `step-${index}`,
    title: `${item.name} ${item.surname}`,
  }));

  const { useStepper, steps, utils } = defineStepper(...formSteps);

  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className="space-y-6 p-6 border rounded-lg w-[650px]">
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
                  onClick={() => stepper.goTo(step.id)}
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
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Wróć
            </Button>
            <Button onClick={stepper.next}>
              {stepper.isLast ? "Wyślij" : "Dalej"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-between gap-4">
            <Button variant="secondary" onClick={stepper.reset}>
              Zresetuj
            </Button>
            <Button onClick={stepper.next}>
              {stepper.isLast ? "Wyślij" : "Dalej"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
