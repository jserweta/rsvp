import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Step } from "@stepperize/react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const StepperItem = ({
  needAccommodation,
  menuKinds,
  step,
}: {
  needAccommodation: boolean;
  menuKinds: string[];
  step: Step;
}) => {
  type AttendanceFormCurrentStepSchema = z.infer<typeof step.schema>;

  const { control, watch } = useFormContext<AttendanceFormCurrentStepSchema>();

  return (
    <div className="grid gap-4">
      <FormField
        control={control}
        name={step.id + "_attendance"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex gap-2 items-center">
              <FormLabel className="text-sm font-medium text-start text-primary">
                Wezmę udział w uroczystości
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="no-0" value={"no"}>
                      Nie
                    </SelectItem>
                    <SelectItem key="yes-1" value={"yes"}>
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

      <FormField
        control={control}
        name={step.id + "_menuKind"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex gap-2 items-center">
              <FormLabel className="text-sm font-medium text-start text-primary">
                Wybierz rodzaj menu
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={watch(step.id + "_attendance") !== "yes"}
                >
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
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {needAccommodation && (
        <FormField
          control={control}
          name={step.id + "_accommodation"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex gap-2 items-center">
                <FormLabel className="text-sm font-medium text-start text-primary">
                  Będę potrzebować noclegu
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={watch(step.id + "_attendance") !== "yes"}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Wybierz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="no-0" value={"no"}>
                        Nie
                      </SelectItem>
                      <SelectItem key="yes-1" value={"yes"}>
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

      {step.title.includes("towarzysząca") && (
        <div
          className={watch(step.id + "_attendance") !== "yes" ? "hidden" : ""}
        >
          <Label className="mt-[20px]">
            Jeśli wiesz kto będzie twoją osobą towarzysząca podaj jej Imię i
            nazwisko:
          </Label>

          <div className="flex flex-row flex-wrap gap-2">
            <FormField
              control={control}
              name={step.id + "_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Imię"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={step.id + "_surname"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nazwisko"
                      {...field}
                      value={field.value ?? ""}
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
