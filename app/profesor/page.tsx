import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Button } from '../ui/button';
import { deleteExam } from '../lib/actions';

export default async function ExamList() {
  const res = await sql`
    SELECT id, name, subject, date
    FROM examenes 
    ORDER BY date ASC;
  `;

  const examenes = res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    subject: row.subject,
    date: row.date,
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
      <Link href="/profesor/ver-calificaciones">
        <Button className="mb-4 bg-green-600 hover:bg-green-700 text-white">
          Ver Calificaciones
        </Button>
      </Link>
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
