'use client';
 
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  {
    name: 'Examenes Alumnos',
    href: '/alumno/examenes',
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
            className='mt-6 ml-7 w-60 bg-blue-800  rounded-md outline-2 py-[10px]'
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
