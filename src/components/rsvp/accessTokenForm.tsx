"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  accessTokenSchema,
  AccessTokenSchema,
} from "@/lib/schema/accessTokenFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AccessTokenForm() {
  const form = useForm<AccessTokenSchema>({
    mode: "onTouched",
    resolver: zodResolver(accessTokenSchema),
  });
  const router = useRouter();

  const onSubmit = async () => {
    const { accessToken } = form.getValues();
    router.push(`/rsvp/${accessToken}`);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-3">
          <FormField
            control={form.control}
            name="accessToken"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Imię</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Kod dostępu"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">{"Zatwierdź"}</Button>
      </form>
    </Form>
  );
}
