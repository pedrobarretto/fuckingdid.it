'use client';

import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export function BackButton() {
  return (
    <Button
      onClick={() => redirect('/goals')}
      className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
    >
      {<Undo2 />} back
    </Button>
  );
}
