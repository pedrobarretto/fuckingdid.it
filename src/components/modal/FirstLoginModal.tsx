'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GenericModal } from '@/components/modal/GenericModal';
import { Button } from '@/components/ui/button';

type ModalType = 'confirmation' | 'error';

export default function FirstLoginModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [errorDescription, setErrorDescription] = useState<string>('');

  useEffect(() => {
    const codeParam = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const errorDescriptionParam = searchParams.get('error_description');

    if (codeParam) {
      setModalType('confirmation');
      setIsOpen(true);
    } else if (errorParam) {
      setModalType('error');
      setErrorDescription(
        errorDescriptionParam || 'An unknown error occurred.'
      );
      setIsOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      {isOpen && (
        <GenericModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={
            modalType === 'confirmation'
              ? 'Account Confirmed!'
              : 'Invalid or Expired Email Link'
          }
        >
          <div className="flex flex-col gap-3">
            {modalType === 'confirmation' ? (
              <>
                <span className="text-lg">
                  To access your account, please go to the login page or try to
                  refresh the page, and{' '}
                  <strong className="text-orange-500">
                    just fucking do it!
                  </strong>
                </span>
                <Button
                  variant="default"
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => router.push('/login')}
                >
                  Log in
                </Button>
              </>
            ) : (
              <>
                <span className="text-lg">
                  <strong className="text-orange-500">Oops!</strong> It appears
                  that the email link you used is{' '}
                  <strong className="text-orange-500">
                    invalid or has expired
                  </strong>
                  .{' '}
                  {errorDescription && (
                    <>
                      Error details: <strong>{errorDescription}</strong>.
                    </>
                  )}{' '}
                  Please try logging in again later. Sorry for the
                  inconvenience.
                </span>
              </>
            )}
          </div>
        </GenericModal>
      )}
    </>
  );
}
