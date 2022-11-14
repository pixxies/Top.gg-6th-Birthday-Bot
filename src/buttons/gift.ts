import { ButtonInteraction, Client } from 'discord.js'
import { query } from '../db'
import { errorEmbed, successEmbed } from '../utils/embeds'
import { isStaffMember } from '../utils/perms'
import { giftCache } from '../utils/functions/giftCache'

export const button = {
  name: 'gift',
}

export const execute = async (
  _client: Client,
  interaction: ButtonInteraction
) => {
  if (!interaction.inCachedGuild()) return

  const giftTimestamp = interaction.customId.substring(
    interaction.customId.indexOf('_') + 1
  )
  if (giftCache.has(giftTimestamp))
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}! This gift has already been claimed!`
        ),
      ],
      ephemeral: true,
    })

  giftCache.set(giftTimestamp, interaction.user.id)
  console.log(giftCache)

  if (await isStaffMember(interaction.user))
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}! Staff cannot participate!`
        ),
      ],
      ephemeral: true,
    })

  interaction.message.delete()
  interaction.channel?.send({
    embeds: [successEmbed(`${interaction.user.username} claimed a gift!`)],
  })

  query(`INSERT INTO claimed (userid, giftid) VALUES ($1, $2)`, [
    interaction.user.id,
    giftTimestamp,
  ])
  return
}
