'use client';

import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from './registerSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { signup } from './actions';
import { redirect } from 'next/navigation';
import { GenericModal } from '@/components/modal/GenericModal';
import ConfettiPortal from '@/components/effects/ConfettiPortal';

export default function Register() {
  const supabase = createClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
    },
  });

  async function register(formData: RegisterFormData) {
    const res = await signup(formData);
    if (res.success) {
      return setIsOpen(true);
    }

    if (res.error === 'over_email_send_rate_limit') {
      toast({
        title: 'Too many emails!',
        description:
          'Seems like you just received an email from us! To receive another, wait a little bit!',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sorry, an error occurred!',
        description:
          'An error occurred while creating the account. Please try again later.',
        variant: 'destructive',
      });
    }
  }

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: 'Desculpe, ocorreu um erro!',
          description:
            'Ocorreu um erro ao realizar login, tente novamente mais tarde.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Desculpe, ocorreu um erro!',
        description:
          'Ocorreu um erro ao realizar login, tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center mt-48">
      <Form {...form}>
        <form
          className="w-full max-w-sm p-6 space-y-6 bg-white shadow-lg rounded-lg"
          onSubmit={form.handleSubmit(register)}
        >
          <h1 className="text-2xl font-semibold text-center text-orange-500">
            Start fucking do it here!
          </h1>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <Button
              variant="default"
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Register with magic link
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={signInWithGoogle}
              disabled={isGoogleLoading || form.formState.isSubmitting}
            >
              {isGoogleLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <svg
                  className="mr-2 size-6"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
              )}{' '}
              Sign in with Google
            </Button>
            <div className="text-center">
              <span>
                Already have an account?{' '}
                {
                  <span
                    className="underline hover:no-underline hover:text-orange-500 hover:cursor-pointer"
                    onClick={() =>
                      !form.formState.isSubmitting && redirect('/login')
                    }
                  >
                    Log in here!
                  </span>
                }
              </span>
            </div>
          </div>
        </form>
      </Form>

      <GenericModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Let's gooo! Account created successfully!"
      >
        <>
          <span>
            Now, please <strong>check your email</strong>, click the
            confirmation link, and you will be able to log in from there!{' '}
            <strong className="text-orange-500">You fucking did it!</strong>
          </span>
        </>
      </GenericModal>

      {isOpen && <ConfettiPortal />}
    </div>
  );
}
