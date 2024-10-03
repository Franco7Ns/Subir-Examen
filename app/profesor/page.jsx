import { sql } from "@vercel/postgres";
import { fetchExamenes } from "../lib/data";

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
      <div>
          {users.map((user) => (<h1 key={user.id}>Bienvenido {user.name}</h1>))}
          <fetchExamenes />
      </div>
      <div>
      {examenes.map((examen) => (<h1 key={examen.id}>Proximos examenes:  {examen.name}</h1>))}
      </div>
    </main>
  );
}

export default Page