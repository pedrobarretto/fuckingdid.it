'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GenericModal } from '@/components/modal/GenericModal';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const resendSchema = z.object({
  email: z
    .string({ required_error: 'Please, provide the email from yout account!' })
    .min(1, { message: 'Please, provide the email from yout account!' })
    .refine(
      (email) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        ),
      { message: 'Invalid email' }
    ),
});

export type ResendFormData = z.infer<typeof resendSchema>;

type ModalType = 'confirmation' | 'error';

export default function FirstLoginModal() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [errorDescription, setErrorDescription] = useState<string>('');
  const form = useForm<ResendFormData>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    const codeParam = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const errorDescriptionParam = searchParams.get('error_description');

    if (codeParam) {
      setModalType('confirmation');
      setIsOpen(true);
    } else if (errorParam) {
      setModalType('error');
      setErrorDescription(
        errorDescriptionParam || 'An unknown error occurred.'
      );
      setIsOpen(true);
    }
  }, [searchParams]);

  const resendConfirmationLink = async (formData: ResendFormData) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: formData.email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL,
      },
    });
    if (error) {
      toast({
        title: 'Sorry, an error occurred!',
        description:
          'We were unable to send the confirmation email again. Please try again later.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Yeahhh!',
        description:
          'Please, check your email and click the confirmation link!',
        variant: 'success',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <GenericModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={
            modalType === 'confirmation'
              ? 'Account Confirmed!'
              : 'Invalid or Expired Email Link'
          }
        >
          <div className="flex flex-col gap-3">
            {modalType === 'confirmation' ? (
              <>
                <span className="text-lg">
                  To access your account, please go to the login page and{' '}
                  <strong className="text-orange-500">
                    just fucking do it!
                  </strong>
                </span>
                <Button
                  variant="default"
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => router.push('/login')}
                >
                  Log in
                </Button>
              </>
            ) : (
              <>
                <span className="text-lg">
                  <strong className="text-orange-500">Oops!</strong> It appears
                  that the email link you used is{' '}
                  <strong className="text-orange-500">
                    invalid or has expired
                  </strong>
                  .{' '}
                  {errorDescription && (
                    <>
                      Error details: <strong>{errorDescription}</strong>.
                    </>
                  )}{' '}
                  Please try logging in again or request a new confirmation
                  link.
                </span>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(resendConfirmationLink)}
                    className="flex flex-col gap-3"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Email from your account"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      variant="default"
                      className="bg-orange-500 hover:bg-orange-600 w-full"
                      disabled={
                        form.formState.isSubmitting ||
                        !form.getValues('email').length
                      }
                    >
                      {form.formState.isSubmitting && (
                        <Loader2 className="size-4 animate-spin" />
                      )}{' '}
                      Resend confirmation link
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </GenericModal>
      )}
    </>
  );
}
