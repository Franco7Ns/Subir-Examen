import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT name, email
    FROM users
    WHERE email = 'profesor@gmail.com'
  `
  const exa = await sql`
    SELECT name, subject
    FROM examenes
  `

  const users = res.rows

  const examenes = exa.rows

  return (
    <main>
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Examenes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <h1>asfasfsfas dsd</h1>
        <p>asfdasd</p>
      </div>
    </div>
    <div className="mt-11 pb-80 flex justify-center pl-28 pr-72 ml-72 gap-6 mr-72 bg-blue-500 items-center">
      <div>
      {examenes.map((examen) => (<h1 key={examen.id}>Proximos examenes:  {examen.name} Materia: {examen.subject} </h1>))}
      </div>
    </div>
    </main>
  );
}

export default Page