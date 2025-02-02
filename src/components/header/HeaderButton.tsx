'use client';

import { handleLogOut } from '@/app/actions';
import { Button } from '../ui/button';
import { User } from '@supabase/supabase-js';
import { redirect, usePathname } from 'next/navigation';

export function HeaderButton({ isLogedIn }: { isLogedIn: User | null }) {
  const pathname = usePathname();

  const handleClick = async () => {
    if (isLogedIn) await handleLogOut();
    else redirect('/login');
  };

  return (
    <div className="flex flex-row gap-2">
      <Button variant={'ghost'} onClick={handleClick}>
        {isLogedIn ? 'Logout' : 'Login'}
      </Button>

      {isLogedIn && !pathname.startsWith('/home') && (
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          variant={'default'}
          onClick={() => redirect('/home')}
        >
          Home
        </Button>
      )}
    </div>
  );
}
