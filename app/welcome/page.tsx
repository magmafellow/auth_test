import { verifySession } from "../lib/dal"
import passwordForDb from '@/key'
import pg from "pg";

const pool = new pg.Pool({
  database: "auth_test",
  password: passwordForDb,
  user: "postgres",
  host: "localhost",
  port: 5432,
});

export default async function Page(){
  const session = await verifySession();
  const user = (await pool.query('SELECT * FROM person WHERE id = $1', [session.userId])).rows[0]

  
  return(
    <div className="text-sky-800 font-bold text-2xl text-center">
      Welcome, Dear {user.username}
    </div>
  )
}