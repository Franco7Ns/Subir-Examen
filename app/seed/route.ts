import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, examenes } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
}

async function seedExamenes() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS examenes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      user_id UUID NOT NULL,
      nota INT,
      date DATE NOT NULL
    );
  `;
  const insertedExamenes = await Promise.all(
    examenes.map(
      (examen) => client.sql`
        INSERT INTO examenes (id, name, subject, user_id, nota, date)
        VALUES (${examen.id}, ${examen.name}, ${examen.subject}, ${examen.user_id}, ${examen.nota}, ${examen.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedExamenes;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedExamenes();
    await client.sql`COMMIT`;
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
