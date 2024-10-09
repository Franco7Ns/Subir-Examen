'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon, TrashIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { format } from "date-fns"

interface Exam {
  id: number;
  name: string;
  subject: string;
  date: Date;
}

export default function Page({ initialExamenes }: { initialExamenes: Exam[] }) {
  const [examenes, setExamenes] = useState<Exam[]>(initialExamenes);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const router = useRouter();

  const handleEdit = (examen: Exam) => {
    setEditingExam({ ...examen, date: new Date(examen.date) });
  };

  const handleSave = async () => {
    if (editingExam) {
      try {
        // Implement your update logic here
        setExamenes(examenes.map(e => e.id === editingExam.id ? editingExam : e));
        setEditingExam(null);
        router.push('/profesor');
      } catch (error) {
        console.error('Error updating exam:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este examen?')) {
      try {
        // Implement your delete logic here
        setExamenes(examenes.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting exam:', error);
      }
    }
  };

  return (
    <main className="p-6 bg-green-50">
      <div className="w-full mb-8">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-green-800">Exámenes</h1>
          <Link href="/profesor/crear">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Agregar Examen
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examenes.map((examen) => (
          <div key={examen.id} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            {editingExam && editingExam.id === examen.id ? (
              <>
                <Input
                  value={editingExam.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingExam({ ...editingExam, name: e.target.value })}
                  className="mb-2"
                />
                <Input
                  value={editingExam.subject}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingExam({ ...editingExam, subject: e.target.value })}
                  className="mb-2"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editingExam.date ? format(editingExam.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editingExam.date}
                      onSelect={(date: Date | undefined) => date && setEditingExam({ ...editingExam, date })}
                    />
                  </PopoverContent>
                </Popover>
                <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Guardar
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <BookOpenIcon className="h-5 w-5 mr-2" />
                  {examen.name}
                </h3>
                <p className="text-green-700 mb-2 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Fecha: {new Date(examen.date).toLocaleDateString()}
                </p>
                <p className="text-green-600 mb-4 flex items-center">
                  <BookOpenIcon className="h-5 w-5 mr-2" />
                  Materia: {examen.subject}
                </p>
                <div className="flex justify-between">
                  <Button onClick={() => handleEdit(examen)} className="bg-blue-500 hover:bg-blue-600 text-white">
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(examen.id)} className="bg-red-500 hover:bg-red-600 text-white">
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // Implement your data fetching logic here
  const examenes: Exam[] = [
    // Add some sample data or fetch from your database
  ];

  return {
    props: {
      initialExamenes: examenes,
    },
  };
}