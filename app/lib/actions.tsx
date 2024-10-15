'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

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

export async function addExam(exam: { name: string; subject: string; notas: number; date: string }) {
  await sql`
    INSERT INTO examenes (name, subject, date, notas)
    VALUES (${exam.name}, ${exam.subject}, ${exam.date}, ${exam.notas})
  `;
  revalidatePath('/profesor');
}

export async function getExam(id: string) {
  const res = await sql`
    SELECT id, name, subject, date, notas
    FROM examenes
    WHERE id = ${id}
  `;
  return res.rows[0];
}

export async function updateExam(exam: { id: string; name: string; subject: string; notas: number; date: Date }) {
  await sql`
    UPDATE examenes
    SET name = ${exam.name}, subject = ${exam.subject}, notas = ${exam.notas}, date = ${exam.date.toISOString()}
    WHERE id = ${exam.id}
  `;
  revalidatePath('/profesor');
}

export async function deleteExam(formData: FormData) {
  const id = formData.get('id');
  if (typeof id === 'string') {
    await sql`
      DELETE FROM examenes
      WHERE id = ${id}
    `;
    revalidatePath('/profesor');
  } else {
    throw new Error('Invalid exam ID');
  }
}