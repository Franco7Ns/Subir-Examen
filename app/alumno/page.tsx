import { sql } from '@vercel/postgres';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: Date;
}

interface Nota {
  id: string;
  calificacion: number;
}

interface Users {
  id: string;
  name: string;
  email: string;
}

export default async function ExamList() {
  const res = await sql`
    SELECT id, name, subject, date
    FROM examenes
  `;

  const not = await sql`
    SELECT calificacion
    FROM notas, alumnos
    WHERE alumno_id = alumnos.id
  `;

  const user = await sql`
    SELECT name, email
    FROM users
    WHERE email = 'alumno2@gmail.com'
  `;
  
  const notas: Nota[] = not.rows.map((row) => ({
    id: row.id,
    calificacion: row.calificacion,
  }));

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
  }));

  return (
    <div className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Lista de Exámenes</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examenes.map((examen) => (
          <div key={examen.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">{examen.name}</h3>
            <p className="text-green-700 mb-2">
              Fecha: {examen.date.toLocaleDateString()}
            </p>
            <p className="text-green-600 mb-4">Materia: {examen.subject}</p>
            <div className="flex justify-between">
            </div>
          </div>
        ))}
        {notas.map((nota) => (
          <div key={nota.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">{nota.calificacion}</h3>
            <p className="text-green-700 mb-2">
            </p>
            <p className="text-green-600 mb-4">Materia: </p>
            <div className="flex justify-between">
            </div>
          </div>
        ))}
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">{user.name}</h3>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{user.email}</h3>
            <p className="text-green-700 mb-2">
            </p>
            <p className="text-green-600 mb-4">Materia: </p>
            <div className="flex justify-between">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}