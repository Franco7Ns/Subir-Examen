import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default async function VerCalificaciones({ params }: { params: { id: string; uid: string } }) {
  const { id, uid } = params;

  const res = await sql`
    SELECT u.name as username, n.calificacion, n.user_id, n.exam_id, e.name as examname
    FROM notas n 
    LEFT JOIN users u ON n.user_id = u.id
    LEFT JOIN examenes e ON n.exam_id = e.id
    WHERE n.exam_id = ${id} AND u.id = ${uid}
  `;

  const calificaciones = res.rows;

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Calificaciones</h1>
      <Link href="/alumno">
        <Button className="mb-4 bg-green-600 hover:bg-green-700 text-white">
          Volver a Exámenes
        </Button>
      </Link>
      <table className="min-w-full bg-white border border-green-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Usuario</th>
            <th className="py-2 px-4 border-b">Examen</th>
            <th className="py-2 px-4 border-b">Calificación</th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((calificacion, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{calificacion.username}</td>
              <td className="py-2 px-4 border-b">{calificacion.examname}</td>
              <td className="py-2 px-4 border-b">{calificacion.calificacion !== null ? calificacion.calificacion : 'No calificado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
