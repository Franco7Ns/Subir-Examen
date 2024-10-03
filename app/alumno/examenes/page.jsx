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
      <section className="mt-11 pl-28 pt-20 pb-20 pr-72 ml-72 mr-96 bg-blue-500 flex items-center">
        <ul>
          {alumnos.map((alumno) => (<li key={alumno.id}>El alumno {alumno.name} tiene la nota: {alumno.calificacion}</li>))}
        </ul>
      </section>
    </main>
  );
}

export default Page