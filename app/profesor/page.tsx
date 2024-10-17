import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Button } from '../ui/button';
import { deleteExam } from '../lib/actions';

interface Exam {
  id: string;
  name: string;
  subject: string;
  user_id: string;
  nota: number;
  date: Date;
  username: string;
}

export default async function ExamList() {
  const res = await sql`
    SELECT e.id, e.name, subject, user_id, nota, date, u.name AS "username"
    FROM Examenes e
    LEFT JOIN users u ON 
    e.user_id = u.id
    ORDER BY date ASC
  `;

  const examenes: Exam[] = res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    subject: row.subject,
    user_id: row.user_id,
    nota: row.nota,
    date: new Date(row.date),
    username: row.username
  }));

  const today = new Date();

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
            <h3 className={`text-lg font-semibold mb-2 ${examen.date < today ? 'text-red-600' : 'text-green-800'}`}>
              {examen.name}
            </h3>
            <p className={`mb-2 ${examen.date < today ? 'text-red-600' : 'text-green-700'}`}>
              Fecha: {examen.date.toLocaleDateString()}
            </p>
            <p className={`mb-4 ${examen.date < today ? 'text-red-600' : 'text-green-600'}`}>
              Materia: {examen.subject}
            </p>
            <p className={`mb-4 ${examen.date < today ? 'text-red-600' : 'text-green-600'}`}>
              Nota: {examen.nota}
            </p>
            <p className={`mb-4 ${examen.date < today ? 'text-red-600' : 'text-green-600'}`}>
              Nota: {examen.username}
            </p>
            <div className="flex justify-between">
              <Link href={`/profesor/edit/${examen.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Editar
                </Button>
              </Link>
              <Link href={`/profesor/calificar/${examen.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Calificar
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
