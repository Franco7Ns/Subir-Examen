export type User = {
    id: string
    name?: string | null
    email?: string | null
    role?: 'profesor' | 'alumno'
};

export type Examen = {
  id: string; 
  name: string;
  subject: string;
  date: string;
};

export type Notas = {
  id: string; 
  user_id: string;
  examen_id: string;
  calificacion: number;
};
