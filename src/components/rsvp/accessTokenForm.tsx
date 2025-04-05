'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  accessTokenSchema,
  AccessTokenSchema,
} from '@/lib/schema/accessTokenFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { useTransition } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export default function AccessTokenForm() {
  const form = useForm<AccessTokenSchema>({
    mode: 'onTouched',
    resolver: zodResolver(accessTokenSchema),
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    const { accessToken } = form.getValues();

    try {
      startTransition(() => router.push(`/rsvp/${accessToken}`));
    } catch (err) {
      console.error('Routing error:', err);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-6 bg-white/20 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <FormField
            control={form.control}
            name="accessToken"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-4">
                  <Label className="text-start text-sm">
                    Wprowadź swój kod dostępu
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="Kod dostępu"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-fit self-end">
          {isPending ? (
            <>
              {'Zatwierdź'} <AiOutlineLoading className="animate-spin" />
            </>
          ) : (
            'Zatwierdź'
          )}
        </Button>
      </form>
    </Form>
  );
}
