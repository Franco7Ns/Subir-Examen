'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { db } from '@vercel/postgres';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid credentials.');
        default:
          throw new Error('Something went wrong.');
      }
    }
    throw error;
  }
}

export async function addExam(exam: { name: string; subject: string; date: string }) {
  await sql`
    INSERT INTO examenes (name, subject, date)
    VALUES (${exam.name}, ${exam.subject}, ${exam.date})
  `;
  revalidatePath('/profesor');
  revalidatePath('/profesor/ver-calificaciones');
}

export async function getExam(id: string) {
  const res = await sql`
    SELECT id, name, subject, date
    FROM examenes
    WHERE id = ${id}
  `;
  revalidatePath('/profesor');
  revalidatePath('/profesor/ver-calificaciones');
  return res.rows[0];
}

export async function updateExam(exam: { id: string; name: string; subject: string; date: Date; }) {
  const client = await db.connect();
  try {
    await client.sql`
      UPDATE examenes
      SET name = ${exam.name}, subject = ${exam.subject}, date = ${exam.date.toISOString()}
      WHERE id = ${exam.id}
    `;
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  } 
  revalidatePath('/profesor');
  revalidatePath('/profesor/ver-calificaciones');
}

export async function deleteExam(formData: FormData) {
  const id = formData.get('id');
  if (typeof id === 'string') {
    await sql`
      DELETE FROM examenes
      WHERE id = ${id}
    `;
    revalidatePath('/profesor');
    revalidatePath('/profesor/ver-calificaciones');
  } else {
    throw new Error('Invalid exam ID');
  }
}

interface User {
  id: string;
  name: string;
}

export async function getUsers(): Promise<User[]> {
  const client = await db.connect();
  try {
    const result = await client.sql`SELECT id, name, role FROM users`;
    // Convertir los resultados al tipo User
    const users: User[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      role: row.role, // Asegúrate de incluir el campo role
    }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  } 
}

export async function updateCalificacion(userId: string, examId: string, calificacion: number): Promise<void> {
  const client = await db.connect();
  try {
    await client.sql`
      INSERT INTO notas (user_id, examen_id, calificacion)
      VALUES (${userId}, ${examId}, ${calificacion})
      ON CONFLICT (user_id, examen_id)
      DO UPDATE SET calificacion = ${calificacion}
    `;
    revalidatePath('/profesor/ver-calificaciones'); 
  } catch (error) {
    console.error('Error updating calificacion:', error);
    throw error;
  } 
}




export async function getNotas(examId: string): Promise<{ userId: string, calificacion: number }[]> {
  const client = await db.connect();
  try {
    const result = await client.sql`
      SELECT user_id, calificacion
      FROM notas
      WHERE examen_id = ${examId}
    `;
    revalidatePath('/profesor');
    return result.rows.map(row => ({
      userId: row.user_id,
      calificacion: row.calificacion,
    }));
  } catch (error) {
    console.error('Error fetching notas:', error);
    throw error;
  } 
}




