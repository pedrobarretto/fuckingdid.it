import { Button } from '@/components/ui/button';
import { handleLogOut } from './actions';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-[#333c4c] font-sans text-center">
      <h1 className="text-5xl font-bold mb-4">
        <span className="text-orange-500">FuckingDid.it</span>
      </h1>
      <p className="text-xl mb-6">
        Coming soon. Because sometimes, all you need is a little nudge to get it
        done.
      </p>
      <p className="text-s">Stay tuned for the launch! 🚀</p>

      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
}
