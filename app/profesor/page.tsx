import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Button } from '../ui/button';
import { deleteExam } from '../lib/actions';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: Date;
}

export default async function ExamList() {
  const res = await sql`
    SELECT id, name, subject, date
    FROM examenes
  `;

  const examenes: Exam[] = res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    subject: row.subject,
    date: new Date(row.date),
  }));

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Lista de Exámenes</h1>
      <Link href="/profesor/add">
        <Button className="mb-4 bg-green-600 hover:bg-green-700 text-white">
          Agregar Examen
        </Button>
      </Link>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examenes.map((examen) => (
          <div key={examen.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">{examen.name}</h3>
            <p className="text-green-700 mb-2">
              Fecha: {examen.date.toLocaleDateString()}
            </p>
            <p className="text-green-600 mb-4">Materia: {examen.subject}</p>
            <div className="flex justify-between">
              <Link href={`/profesor/edit/${examen.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Editar
                </Button>
              </Link>
              <form action={deleteExam}>
                <input type="hidden" name="id" value={examen.id} />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Borrar
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}