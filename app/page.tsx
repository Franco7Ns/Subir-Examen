import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex text-4xl pt-50 pl-80 min-h-screen flex-col p-6 bg-green-500">
      <div>
        <div className="flex flex-col justify-center gap-5 rounded-lg px-6 py-20 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            Bienvenido a la pagina donde subir y ver los examenes
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-900 md:text-base"
          >
            <span>Ingresar</span> 
          </Link>
        </div>
      </div>
    </main>
  );
}