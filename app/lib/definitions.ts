export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Examen = {
  id: string; 
  name: string;
  subject: string;
  date: string;
};

export type Nota = {
  id: string;
  alumno_id: string;
  profesor_id: string;
  calificacion: number;
};
