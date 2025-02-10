import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  // Extract search parameters and origin from the request URL
  const { searchParams, origin } = new URL(request.url);
  console.log('searchParams, origin: ', searchParams, origin);

  // Get the authorization code and the 'next' redirect path
  const code = searchParams.get('code');
  console.log('code: ', code);

  if (code) {
    // Create a Supabase client
    const supabase = await createClient();

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log('error: ', error);
    if (!error) {
      // If successful, redirect to the 'next' path or home
      console.log('Redirecting to /goals...');
      return NextResponse.redirect(`${origin}/goals`);
    }
  }

  console.log('Redirecting to /error...');
  // If there's no code or an error occurred, redirect to an error page
  return NextResponse.redirect(`${origin}/error`);
}
