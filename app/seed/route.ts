import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, examenes, notas } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`DROP TABLE IF EXISTS users`;
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(255) NOT NULL
    );
  `;
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, role)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
}

async function seedExamenes() {
  await client.sql`DROP TABLE IF EXISTS examenes`;
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS examenes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;
  const insertedExamenes = await Promise.all(
    examenes.map(
      (examen) => client.sql`
        INSERT INTO examenes (id, name, subject, date)
        VALUES (${examen.id}, ${examen.name}, ${examen.subject}, ${examen.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedExamenes;
}

async function seedNotas() {
  await client.sql`DROP TABLE IF EXISTS notas`;
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS notas (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      examen_id UUID NOT NULL,
      calificacion INT NOT NULL
    );
  `;
  const insertedNotas = await Promise.all(
    notas.map(
      (nota) => client.sql`
        INSERT INTO notas (id, user_id, examen_id, calificacion)
        VALUES (${nota.id}, ${nota.user_id}, ${nota.examen_id}, ${nota.calificacion})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedNotas;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedExamenes();
    await seedNotas();
    await client.sql`COMMIT`;
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
