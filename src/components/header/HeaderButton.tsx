'use client';

import { handleLogOut } from '@/app/actions';
import { Button } from '../ui/button';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export function HeaderButton({ isLogedIn }: { isLogedIn: User | null }) {
  const handleClick = async () => {
    if (isLogedIn) await handleLogOut();
    else redirect('/login');
  };
  return (
    <Button variant={'ghost'} onClick={handleClick}>
      {isLogedIn ? 'Logout' : 'Login'}
    </Button>
  );
}
