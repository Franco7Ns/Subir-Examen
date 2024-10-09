'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Input } from '@/app/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import { format } from "date-fns"

interface NewExam {
  name: string;
  subject: string;
  date: Date | null;
}

export default function CrearExamen() {
  const [newExam, setNewExam] = useState<NewExam>({ name: '', subject: '', date: null });
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implement your create exam logic here
      console.log('Creating exam:', newExam);
      router.push('/profesor');
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };

  return (
    <main className="p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Agregar Nuevo Examen</h1>
      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Examen</label>
          <Input
            id="name"
            value={newExam.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExam({ ...newExam, name: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Materia</label>
          <Input
            id="subject"
            value={newExam.subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExam({ ...newExam, subject: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newExam.date ? format(newExam.date, "PPP") : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newExam.date || undefined}
                onSelect={(date: Date | undefined) => setNewExam({ ...newExam, date: date || null })}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Guardar Examen
        </Button>
      </form>
    </main>
  );
}