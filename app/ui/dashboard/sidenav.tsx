import NavLinks from '@/app/ui/dashboard/nav-links';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div>
      <div>
        <NavLinks />
        <div></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button>
            <div>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
