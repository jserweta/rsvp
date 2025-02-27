import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Step } from "@stepperize/react";

export const StepperItem = ({
  needAccommodation,
  menuKinds,
  step,
}: {
  needAccommodation: boolean;
  menuKinds: string[];
  step: Step;
}) => {
  const [attendance, setAttendance] = useState<boolean>(false);

  return (
    <div className="grid gap-4">
      <div className="flex gap-2 items-center">
        <Checkbox
          id={"attendance_" + step.id}
          onCheckedChange={(checked) => setAttendance(Boolean(checked))}
        />
        <label
          htmlFor={"attendance_" + step.id}
          className="text-sm font-medium text-start"
        >
          Obecność
        </label>
      </div>

      <div className="grid gap-2">
        <label
          htmlFor={"menuKind_" + step.id}
          className="text-sm font-medium text-start"
        >
          Rodzaj menu
        </label>
        <Select disabled={!attendance}>
          <SelectTrigger className="w-[200px]">
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
      </div>
      {needAccommodation && (
        <div className="flex gap-2 items-center">
          <Checkbox id={"accommodation_" + step.id} disabled={!attendance} />
          <label
            htmlFor={"accommodation_" + step.id}
            className="text-sm font-medium text-start"
          >
            Nocleg
          </label>
        </div>
      )}
    </div>
  );
};
