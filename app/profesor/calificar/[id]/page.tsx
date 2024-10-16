'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import { getExam, updateExam } from '@/app/lib/actions';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: Date;
  calificacion: number | null;
}

export default function CalificarExam({ params }: { params: { id: string } }) {
  const [exam, setExam] = useState<Exam | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExam = async () => {
      const fetchedExam = await getExam(params.id);
      if (fetchedExam) {
        setExam({
          id: fetchedExam.id,
          name: fetchedExam.name,
          subject: fetchedExam.subject,
          date: new Date(fetchedExam.date),
          calificacion: fetchedExam.calificacion,
        });
      }
    };
    fetchExam();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exam) {
      await updateExam(exam);
      router.push('/profesor');
    }
  };

  if (!exam) return <p>Cargando examen...</p>;

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Calificar Examen</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <p className="text-lg font-bold text-green-600 mb-4">Nota</p>
        <Input
          value={exam.calificacion !== null ? exam.calificacion : ''}
          onChange={(e) => setExam({ ...exam, calificacion: Number(e.target.value) })}
          placeholder="Nota"
        />
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          Guardar Cambios
        </Button>
      </form>
    </main>
  );
}
