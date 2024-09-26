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
      <div className="mt-40 ml-72 mr-72 bg-blue-500 items-center">
          {users.map((user) => (<h1 key={user.id}>Bienvenido {user.name}</h1>))}
      </div>
    </main>
  );
}

export default Page