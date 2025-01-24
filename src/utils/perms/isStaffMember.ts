import { User } from 'discord.js'
import { spawnGuild, staffRoles } from '../../globals'

export const isStaffMember = async (user: User) => {
  try {
    const member = await spawnGuild(user.client)?.members.fetch(user.id)
    if (member && member.roles.cache.hasAny(...Object.values(staffRoles)))
      return true
    else return false
  } catch {
    return false
  }
}
