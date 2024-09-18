// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { date } from "zod";

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Profesor',
    email: 'profesor@gmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6441a',
    name: 'Alumno',
    email: 'alumno@gmail.com',
    password: '123456',
  },
];

const alumnos = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Franco',
  },
];

const profesores = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81da',
    name: 'Juan',
  },
];

const examenes = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ba',
    name: 'Juan',
    subject: 'Biologia',
    date: '2024-12-06',
  },
];

const notas = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ab',
    alumno_id: alumnos[0].id,
    examen_id: examenes[0].id,
    calificacion: 10,
  },
];



export { users, alumnos, profesores, examenes, notas };
