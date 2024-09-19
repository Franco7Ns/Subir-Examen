'use client';
 
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/dashboard' },
  {
    name: 'Examenes',
    href: '/dashboard/examenes',
  },
];

export default function NavLinks() {

  return (
    <>
      {links.map((link) => {
        return (
         <Link
            key={link.name}
            href={link.href}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
