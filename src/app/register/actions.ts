'use server';

import { createClient } from '@/utils/supabase/server';
import { RegisterFormData } from './registerSchema';
import { Err, Ok } from '@/utils/ErrorHandler';

export async function signup(formData: RegisterFormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email: formData.email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
      data: {
        full_name: formData.username,
      },
    },
  });

  if (error?.code === 'over_email_send_rate_limit')
    return Err('over_email_send_rate_limit');

  if (error) return Err('UNKNOWN_ERROR');

  return Ok(data);
}
