'use server';

import { createClient } from '@/utils/supabase/server';
import { RegisterFormData } from './registerSchema';
import { Err, Ok } from '@/utils/ErrorHandler';
import { createCanvas } from 'canvas';

function generateBase64ProfileImage(username: string): string {
  const canvas = createCanvas(150, 150);
  const context = canvas.getContext('2d');
  const firstLetter = username.charAt(0).toUpperCase();
  const bgColor = '#333c4c';

  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = 'bold 70px Arial';
  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}

export async function signup(formData: RegisterFormData) {
  const supabase = await createClient();
  const profileImageBase64 = generateBase64ProfileImage(formData.username);
  const { data, error } = await supabase.auth.signInWithOtp({
    email: formData.email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/goals`,
      data: {
        full_name: formData.username,
        avatar_url: profileImageBase64,
      },
    },
  });

  if (error?.code === 'over_email_send_rate_limit')
    return Err('over_email_send_rate_limit');

  if (error) return Err('UNKNOWN_ERROR');

  return Ok(data);
}
