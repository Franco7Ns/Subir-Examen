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
  user_id: string;
  calificacion: number;
};

export type Notas = {
  id: string; 
  user_id: string;
  examen_id: string;
  calificacion: number;
};
