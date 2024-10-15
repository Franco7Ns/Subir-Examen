import { sql } from '@vercel/postgres';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: Date;
  notas: number;
}

interface Users {
  id: string;
  name: string;
  email: string;
}

export default async function ExamList() {
  const res = await sql`
    SELECT id, name, subject, date, notas
    FROM examenes
    ORDER BY date ASC
  `;

  const user = await sql`
    SELECT name, email
    FROM users
    WHERE email = 'alumno2@gmail.com'
  `;

  const users: Users[] = user.rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
  }));

  const examenes: Exam[] = res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    subject: row.subject,
    date: new Date(row.date),
    notas: row.notas,
  }));

  const today = new Date();

  return (
    <div className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Lista de Exámenes</h1>
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
              Nota: {examen.notas}
            </p>
            <div className="flex justify-between">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
