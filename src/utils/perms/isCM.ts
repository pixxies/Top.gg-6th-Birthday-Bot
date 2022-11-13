import { User } from 'discord.js'
import { topggGuild, staffRoles } from '../../globals'

export const isCM = async (user: User) => {
  try {
    const member = await topggGuild(user.client)?.members.fetch(user.id)
    if (member && member.roles.cache.has(staffRoles.cm)) return true
    else return false
  } catch {
    return false
  }
}
