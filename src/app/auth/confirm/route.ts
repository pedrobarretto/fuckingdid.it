import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  // Extract search parameters and origin from the request URL
  const { searchParams, origin } = new URL(request.url);

  // Get the authorization code and the 'next' redirect path
  const token_hash = searchParams.get('token_hash');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const type: any = searchParams.get('type');
  if (token_hash && type) {
    // Create a Supabase client
    const supabase = await createClient();

    // Exchange the code for a session
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      // If successful, redirect to the 'next' path or home
      return NextResponse.redirect(`${origin}/goals`);
    }
  }

  // If there's no code or an error occurred, redirect to an error page
  return NextResponse.redirect(`${origin}/error`);
}
