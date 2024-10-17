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
  {
    id: '410544b2-4001-4271-9855-fec4b6a6441b',
    name: 'Alumno Pedro',
    email: 'pedroalumno@gmail.com',
    password: '123456',
  },
];

const examenes = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ba',
    name: 'Examen de Biologia',
    subject: 'Biologia',
    user_id: users[0].id,
    nota: 10,
    date: '2024-12-06',
  },
];

export { users, examenes };