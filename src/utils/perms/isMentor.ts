import { User } from 'discord.js'
import { topggGuild, staffRoles } from '../../globals'

export const isMentor = async (user: User) => {
  try {
    const member = await topggGuild(user.client)?.members.fetch(user.id)
    if (member && member.roles.cache.has(staffRoles.brmentor)) return true
    else return false
  } catch {
    return false
  }
}
