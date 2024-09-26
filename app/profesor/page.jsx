import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT name, email
    FROM users
    WHERE email = 'profesor@gmail.com'
  `
  const exa = await sql`
    SELECT name
    FROM examenes
  `

  const users = res.rows

  const examenes = exa.rows

  return (
    <main>
      <div className="mt-40 ml-72 mr-72 bg-blue-500 items-center">
          {users.map((user) => (<h1 key={user.id}>Bienvenido {user.name}</h1>))}
      </div>
      <div className="mt-40 ml-72 mr-72 bg-blue-500 items-center">
      {examenes.map((examen) => (<h1 key={examen.id}>Proximos examenes:  {examen.name}</h1>))}
      </div>
    </main>
  );
}

export default Page