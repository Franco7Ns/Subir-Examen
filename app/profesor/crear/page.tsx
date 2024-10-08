import { sql } from "@vercel/postgres";

export default async function Page() {
  const res = await sql`
    SELECT name, email
    FROM users
    WHERE email = 'profesor@gmail.com'
  `;

  const exa = await sql`
    SELECT name, subject, date
    FROM examenes
  `;

  const users = res.rows;
  const examenes = exa.rows;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Crear Examen</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <h2 className="text-xl">Información Adicional</h2>
          <p>Detalles del examen</p>
        </div>
      </div>

      <div className="mt-11 bg-primary/10 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Próximos Exámenes</h2>
  
      </div>
    </main>
  );
}