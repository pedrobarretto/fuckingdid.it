'use server';

import { createClient } from '@/utils/supabase/server';
import { Err, Ok } from '@/utils/ErrorHandler';
import { LoginFormData } from './loginSchema';

export async function login(formData: LoginFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: formData.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
      shouldCreateUser: false,
    },
  });

  if (error) return Err('UNKNOWN_ERROR');

  return Ok(null);
}
