'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import { getExam, updateExam, getUsers } from '@/app/lib/actions';

interface Exam {
  id: string;
  name: string;
  subject: string;
  user_id: string;
  nota: number;
  date: Date;
}

interface User {
  id: string;
  name: string;
}

export default function CalificarExam({ params }: { params: { id: string } }) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExam = async () => {
      const fetchedExam = await getExam(params.id);
      if (fetchedExam) {
        setExam({
          id: fetchedExam.id,
          name: fetchedExam.name,
          subject: fetchedExam.subject,
          user_id: fetchedExam.user_id,
          nota: fetchedExam.nota,
          date: new Date(fetchedExam.date),
        });
      }
    };

    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };

    fetchExam();
    fetchUsers();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exam) {
      await updateExam(exam);
      router.refresh(); // Forzar la recarga de la página
      router.push('/profesor'); // Navegar a la página /profesor después de guardar
    }
  };

  if (!exam) return <p>Cargando examen...</p>;

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Calificar Examen</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <p className="text-lg font-bold text-green-600 mb-4">Nota</p>
        <Input
          value={exam.nota !== null ? exam.nota : ''}
          onChange={(e) => setExam({ ...exam, nota: Number(e.target.value) })}
          placeholder="Nota"
        />
        <p className="text-lg font-bold text-green-600 mb-4">Usuario</p>
        <select
          value={exam.user_id}
          onChange={(e) => setExam({ ...exam, user_id: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          Guardar Cambios
        </Button>
      </form>
    </main>
  );
}
