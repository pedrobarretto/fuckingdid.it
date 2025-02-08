import { createClient } from '@/utils/supabase/server';
import { BackButton } from './_components/BackButton';
import { DeleteAccountButton } from './_components/DeleteAccountButton';

export default async function SettingsPage() {
  const db = await createClient();
  const { data } = await db.auth.getUser();
  const { email } = data?.user?.user_metadata || {};
  const { id } = data?.user || { id: null };

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12 w-full mt-14">
      <BackButton />
      <div className="mt-6 gap-3 flex flex-col">
        <span>You are signed in as {email}</span>
        <DeleteAccountButton userId={id} />
      </div>
    </div>
  );
}
