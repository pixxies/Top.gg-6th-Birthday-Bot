import { User } from 'discord.js'
import { topggGuild, staffRoles } from '../../globals'

export const isStaffMember = async (user: User) => {
  try {
    const member = await topggGuild(user.client)?.members.fetch(user.id)
    if (member && member.roles.cache.hasAny(...Object.values(staffRoles)))
      return true
    else return false
  } catch {
    return false
  }
}
