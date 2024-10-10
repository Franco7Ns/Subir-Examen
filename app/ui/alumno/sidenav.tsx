import Link from 'next/link';
import NavLinks from '@/app/ui/alumno/nav-links';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex flex-row sz md:flex-col text-white md:space-y-2">
        <NavLinks  />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex mt-6 ml-7 w-60 outline-2 py-[10px] h-[48px] grow items-center justify-center gap-2 rounded-md bg-green-700 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
