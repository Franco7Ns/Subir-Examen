import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Button } from '../../../ui/button';

export default async function VerCalificaciones({ params }: { params: { id: string } }) {
  const { id } = params; // Obtener el ID del examen desde los parámetros

  const res = await sql`
    SELECT u.name as user_name, e.name as exam_name, n.calificacion
    FROM users u
    LEFT JOIN notas n ON u.id = n.user_id
    LEFT JOIN examenes e ON e.id = n.examen_id
    WHERE e.id = ${id} -- Filtrar por el ID del examen
    ORDER BY u.name, e.name;
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
              <td className="py-2 px-4 border-b">{calificacion.user_name}</td>
              <td className="py-2 px-4 border-b">{calificacion.exam_name}</td>
              <td className="py-2 px-4 border-b">{calificacion.calificacion !== null ? calificacion.calificacion : 'No calificado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
