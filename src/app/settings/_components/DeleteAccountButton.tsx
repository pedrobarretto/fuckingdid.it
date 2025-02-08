'use client';

import { GenericModal } from '@/components/modal/GenericModal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import * as emoji from 'node-emoji';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { deleteAccount } from '../actions';
import { useToast } from '@/hooks/use-toast';

export function DeleteAccountButton({ userId }: { userId: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    if (!userId) {
      toast({
        title: 'Oops! An error has occurred!',
        description: `Sorry! There was an error deleting your account. Maybe it's fate wanting you to stay a little longer... ${emoji.get(
          'crystal_ball'
        )}`,
        variant: 'destructive',
      });
      return;
    }
    const res = await deleteAccount(userId);
    if (res.success) {
      setIsLoading(false);
      setIsOpen(false);
      redirect('/');
    }

    toast({
      title: 'Oops! An error has occurred!',
      description: `Sorry! There was an error deleting your account. Maybe it's fate wanting you to stay a little longer... ${emoji.get(
        'crystal_ball'
      )}`,
      variant: 'destructive',
    });
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className="text-white hover:text-red-500 bg-red-500 hover:bg-white"
        onClick={() => setIsOpen(true)}
      >
        Delete Account
      </Button>
      <GenericModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete Account ${emoji.get('cry')}`}
      >
        <div className="flex flex-col justify-center items-start">
          <span>
            Are you sure you want to{' '}
            {<strong className="text-red-500">delete</strong>} your account?
          </span>
          <div className="flex flex-row w-full gap-3 mt-3">
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 w-full"
              disabled={isLoading}
              onClick={handleDeleteAccount}
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />} Delete
            </Button>
            <Button
              className=" bg-orange-500 hover:bg-orange-600 w-full"
              disabled={isLoading}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </GenericModal>
    </>
  );
}
