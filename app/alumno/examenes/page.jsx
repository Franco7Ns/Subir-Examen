import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT name, calificacion
    FROM alumnos, notas
    WHERE alumno_id = alumnos.id
  `
  const alumnos = res.rows

  return (
    <main>
      <div className="mt-40 ml-72 mr-72 bg-blue-500 items-center">
        <ul>
          {alumnos.map((alumno) => (<li key={alumno.id}>El alumno {alumno.name} tiene la nota: {alumno.calificacion}</li>))}
        </ul>
      </div>
    </main>
  );
}

export default Page