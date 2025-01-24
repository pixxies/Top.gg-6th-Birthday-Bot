import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'pixxiebotbday',
})

export const query = async (
  sql: string,
  params: Array<string | number | null>
) => {
  const res = await pool.query(sql, params)
  return res
}
