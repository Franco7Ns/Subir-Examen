export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  password: string; // Mantener la propiedad password
  role?: 'profesor' | 'alumno';
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

// Nuevo tipo para el frontend que excluye la propiedad password
export type FrontendUser = Omit<User, 'password'>;
