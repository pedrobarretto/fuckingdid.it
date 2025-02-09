'use client';

import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ConfettiPortal() {
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <Confetti
        recycle={false}
        gravity={0.1}
        initialVelocityX={2}
        initialVelocityY={2}
        numberOfPieces={500}
        opacity={1}
        run
        wind={0}
        width={width}
        height={height}
      />
    </div>,
    document.body
  );
}
