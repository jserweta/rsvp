import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step } from "@stepperize/react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AttendanceStatus,
  attendanceStatusList,
  MenuKinds,
} from "@/lib/enum-definitions";
import { TRANSPORT_SELECT_VALUES } from "@/lib/data/transportSelectValues";
import { ATTENDANCE_SELECT_VALUES } from "@/lib/data/attendanceSelectValues";

export const StepperItem = ({
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

  const { control, watch } = useFormContext<AttendanceFormCurrentStepSchema>();

  return (
    <div className="grid gap-4">
      <FormField
        control={control}
        name={step.id + "_attendance"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex flex-col gap-2">
              <FormLabel className="text-sm font-medium text-start text-primary">
                Czy dołączysz do nas w tym wyjątkowym dniu?
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
        name={step.id + "_menuKind"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex flex-col gap-2">
              <FormLabel className="text-sm font-medium text-start text-primary">
                Jakie menu preferujesz?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? MenuKinds.STANDARDOWE}
                  disabled={
                    watch(step.id + "_attendance") !==
                    AttendanceStatus.CONFIRMED
                  }
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

      {needTransport && (
        <FormField
          control={control}
          name={step.id + "_transport"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col gap-2">
                <FormLabel className="text-sm font-medium text-start text-primary">
                  Czy potrzebujesz transportu?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? TRANSPORT_SELECT_VALUES[0]}
                    disabled={
                      watch(step.id + "_attendance") !==
                      AttendanceStatus.CONFIRMED
                    }
                  >
                    <SelectTrigger className="w-[250px]">
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
          name={step.id + "_accommodation"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col gap-2">
                <FormLabel className="text-sm font-medium text-start text-primary">
                  Czy potrzebujesz noclegu?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={
                      watch(step.id + "_attendance") !==
                      AttendanceStatus.CONFIRMED
                    }
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

      {step.title.includes("towarzysząca") &&
        watch(step.id + "_attendance") === AttendanceStatus.CONFIRMED && (
          <>
            <Label className="mt-[20px]">
              Jeśli już wiesz, kto będzie Ci towarzyszyć, podaj imię i nazwisko
            </Label>

            <div className="flex flex-row gap-2">
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
          </>
        )}
    </div>
  );
};
