import { sql } from "@vercel/postgres";

export default async function Page() {
  const res = await sql`
    SELECT name, subject, date
    FROM examenes
  `;

  const examenes = res.rows;

  return (
    <main className="p-6 bg-green-50">
      <h1 className="mb-4 text-2xl md:text-3xl font-bold text-green-800">
        Exámenes
      </h1>
      <div className="mt-6 mb-8">
        <h2 className="text-xl font-semibold text-green-700 flex items-center">
          Próximos exámenes
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examenes.map((examen, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
              {examen.name}
            </h3>
            <p className="text-green-700 mb-2 flex items-center">
              Fecha: {new Date(examen.date).toLocaleDateString()}
            </p>
            <p className="text-green-600">
              Materia: {examen.subject}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};