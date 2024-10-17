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

