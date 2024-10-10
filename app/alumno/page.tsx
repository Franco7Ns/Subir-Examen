import { sql } from '@vercel/postgres';

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
      </div>
    </div>
  );
}