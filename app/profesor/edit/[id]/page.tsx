'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { getExam, updateExam } from '@/app/lib/actions';

interface Exam {
  id: string;
  name: string;
  subject: string;
  user_id: string;
  nota: number;
  date: Date;
}

export default function EditExam({ params }: { params: { id: string } }) {
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
          user_id: fetchedExam.user_id,
          nota: fetchedExam.nota,
          date: new Date(fetchedExam.date),
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

  const handleDateSelect = (newDate: Date | undefined) => {
    if (exam && newDate) {
      setExam({ ...exam, date: newDate });
    }
  };

  if (!exam) return <p>Cargando examen...</p>;

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Editar Examen</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <p className="text-lg font-bold text-green-600 mb-4">Nombre</p>
        <Input
          value={exam.name}
          onChange={(e) => setExam({ ...exam, name: e.target.value })}
          placeholder="Nombre del examen"
          required
        />
        <p className="text-lg font-bold text-green-600 mb-4">Materia</p>
        <Input
          value={exam.subject}
          onChange={(e) => setExam({ ...exam, subject: e.target.value })}
          placeholder="Materia"
          required
        />
        <p className="text-lg font-bold text-green-600 mb-4">Fecha</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {exam.date ? format(exam.date, 'PPP') : <span>Selecciona una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={exam.date}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          Guardar Cambios
        </Button>
      </form>
    </main>
  );
}
