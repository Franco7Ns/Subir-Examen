'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import { getExam, getNotas, updateCalificacion, getUsers } from '@/app/lib/actions';
import { FrontendUser, Examen } from '@/app/lib/definitions';

export default function CalificarExam({ params }: { params: { id: string } }) {
  const [exam, setExam] = useState<Examen | null>(null);
  const [users, setUsers] = useState<FrontendUser[]>([]);
  const [calificaciones, setCalificaciones] = useState<{ [key: string]: number | '' }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchExamAndNotas = async () => {
      const fetchedExam = await getExam(params.id);
      const fetchedNotas = await getNotas(params.id);
      if (fetchedExam) {
        setExam({
          id: fetchedExam.id,
          name: fetchedExam.name,
          subject: fetchedExam.subject,
          date: fetchedExam.date,
        });
        // Inicializar calificaciones con los datos existentes
        const initialCalificaciones = fetchedNotas.reduce((acc: any, nota: any) => {
          acc[nota.userId] = nota.calificacion;
          return acc;
        }, {});
        setCalificaciones(initialCalificaciones);
      }
    };

    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      const alumnos = fetchedUsers.filter((user: FrontendUser) => user.role === 'alumno');
      setUsers(alumnos);
      console.log('Usuarios cargados:', alumnos); // Verifica que los usuarios se están cargando
    };

    fetchExamAndNotas();
    fetchUsers();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exam) {
      try {
        // Validar que las calificaciones no sean mayores de 10
        const valid = Object.values(calificaciones).every(calificacion => calificacion === '' || (typeof calificacion === 'number' && calificacion <= 10));
        if (!valid) {
          alert('Las calificaciones no pueden ser mayores de 10.');
          return;
        }

        await Promise.all(
          Object.entries(calificaciones).map(([userId, calificacion]) =>
            updateCalificacion(userId, exam.id, calificacion as number)
          )
        );
        router.push('/profesor'); // Navegar a la página /profesor después de guardar
      } catch (error) {
        console.error('Error saving calificaciones:', error);
      }
    }
  };

  const handleCalificacionChange = (userId: string, calificacion: number | '') => {
    if (calificacion === '' || (typeof calificacion === 'number' && calificacion <= 10)) {
      setCalificaciones((prev) => ({ ...prev, [userId]: calificacion }));
    } else {
      alert('Las calificaciones no pueden ser mayores de 10.');
    }
  };

  if (!exam) return <p>Cargando examen...</p>;

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Calificar Examen</h1>
      <form onSubmit={handleSave} className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="mb-4">
              <p className="text-lg font-bold text-green-600 mb-2">{user.name}</p>
              <Input
                value={calificaciones[user.id] !== undefined ? calificaciones[user.id] : ''}
                onChange={(e) => handleCalificacionChange(user.id, e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Nota"
                type="number"
                min="1"
                max="10"
              />
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles para calificar.</p>
        )}
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          Guardar Cambios
        </Button>
      </form>
    </main>
  );
}
