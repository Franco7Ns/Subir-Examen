import { sql } from '@vercel/postgres';
import { Examen } from "./definitions";

export async function fetchExamenes() {
    try {
      const data = await sql<Examen>`
        SELECT
          id,
          name
        FROM examenes
        ORDER BY name ASC
      `;
  
      const customers = data.rows;
      return customers;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all customers.');
    }
}