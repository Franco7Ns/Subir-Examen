import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT name
    FROM users
    WHERE email = 'alumno@gmail.com'
  `
  const users = res.rows

  return (
    <main>
      <div>
          {users.map((user) => (<h1 key={user.id}>Bienvenido {user.name}</h1>))}
      </div>
    </main>
  );
}

export default Page