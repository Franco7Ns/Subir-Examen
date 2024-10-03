import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT name
    FROM users
    WHERE email = 'alumno@gmail.com'
  `
  const users = res.rows

  return (
    <div className="mt-11 pl-28 pr-72 ml-72 mr-72 bg-blue-500 items-center">
      <div >
          {users.map((user) => (<h1 key={user.id}>Bienvenido {user.name}</h1>))}
      </div>
    </div>
  );
}

export default Page