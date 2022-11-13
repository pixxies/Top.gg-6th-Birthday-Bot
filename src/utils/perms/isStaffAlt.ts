import { User } from 'discord.js'
import { query } from '../../db'

export const isStaffAlt = async (user: User) => {
  const alt = await query(`SELECT * FROM alts WHERE alt_id = $1`, [user.id])
  if (alt.rows.length) return true
  else return false
}
