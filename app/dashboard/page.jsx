import { sql } from "@vercel/postgres";

const Page = async () => {
  const res = await sql`
    SELECT * FROM users
  `
  const users = res.rows

  return (
    <div className="flex min-h-screen flex-col p-6">
      <ul>
        {users.map((user) => (<li key={user.id}>{user.name}</li>))}
      </ul>
    </div>
  );
}

export default Page