'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';

export function ProfilePicture({ imgUrl }: { imgUrl: string }) {
  return (
    <div
      className="transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      onClick={() => redirect('/settings')}
    >
      <Image
        src={imgUrl}
        alt={'Profile picture'}
        width={55}
        height={55}
        className="rounded-xl"
      />
    </div>
  );
}
