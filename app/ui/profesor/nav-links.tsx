'use client';
 
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/profesor' },
];

export default function NavLinks() {

  return (
    <>
      {links.map((link) => {
        return (
         <Link
            key={link.name}
            href={link.href}
            className='mt-6 ml-7 w-60 bg-green-500  rounded-md outline-2 py-[10px] hover:bg-sky-100 hover:text-green-600'
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
