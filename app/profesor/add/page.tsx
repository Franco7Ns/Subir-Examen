'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { addExam } from '../../lib/actions';

export default function AddExam() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [notas, setNotas] = useState<number | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && subject && date && notas !== undefined) {
      await addExam({ name, subject, notas, date: date.toISOString() });
      router.push('/profesor');
    }
  };

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Agregar Examen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del examen"
          required
        />
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Materia"
          required
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Selecciona una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="number"
          value={notas !== undefined ? notas : ''}
          onChange={(e) => setNotas(Number(e.target.value))}
          placeholder="Nota"
        />
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          Agregar Examen
        </Button>
      </form>
    </main>
  );
}
