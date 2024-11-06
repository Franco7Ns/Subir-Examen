import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Button } from '../ui/button';

export default async function ExamList() {
  const res = await sql`
  SELECT e.id, e.name, e.subject, e.date, u.id as uid
  FROM examenes e, users u
  ORDER BY date ASC;
`;

  const examenes = res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    subject: row.subject,
    date: row.date,
    uid: row.uid,
  }));

  const today = new Date();

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Lista de Exámenes</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examenes.map((examen) => (
          <div key={examen.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className={`text-lg font-semibold mb-2 ${new Date(examen.date) < today ? 'text-red-600' : 'text-green-800'}`}>
              {examen.name}
            </h3>
            <p className={`mb-2 ${new Date(examen.date) < today ? 'text-red-600' : 'text-green-700'}`}>
              Fecha: {new Date(examen.date).toLocaleDateString()}
            </p>
            <p className={`mb-4 ${new Date(examen.date) < today ? 'text-red-600' : 'text-green-600'}`}>
              Materia: {examen.subject}
            </p>
            <div className="flex justify-between">
              <Link href={`/alumno/ver-notas/${examen.id}/${examen.uid}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Ver nota
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
