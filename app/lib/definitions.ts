// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Alumno = {
  id: string;
  name: string;
};

export type Profesor = {
  id: string;
  name: string;
};

export type Examen = {
  id: string; // Will be created on the database
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
