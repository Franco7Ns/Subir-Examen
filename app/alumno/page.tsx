import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT name, subject
    FROM examenes
  `
  const examenes = res.rows

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl `}>
        Examenes
      </h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
        <h1>Proximos examenes</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <h1></h1>
      </div>
    <div className="mt-11 pb-80 pl-28 pr-72 ml-72 gap-6 mr-72 bg-blue-500 items-center">
      <div>
          {examenes.map((examen) => (<h1 key={examen.id}>{examen.name} Materia: {examen.subject}</h1>))}
      </div>
    </div>
    </main>
  );
}

export default Page

