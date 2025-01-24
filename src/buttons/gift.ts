import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
} from 'discord.js'
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

  if (await isStaffMember(interaction.user))
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}! Staff cannot participate!`
        ),
      ],
      ephemeral: true,
    })

  giftCache.set(giftTimestamp, interaction.user.id)

  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`aboutGifts`)
      .setEmoji('🥦')
      .setStyle(ButtonStyle.Secondary)
      .setLabel(`What's this?`)
  )

  interaction.message.delete()

  const claimTime = new Date().getTime()
  const timeToClaim = Math.round(claimTime / 1000) - Number(giftTimestamp)

  try {
    query(
      `INSERT INTO pixxiebotbday.claimed (userid, giftid, ttc, timestamp) VALUES ($1, $2, $3, $4)`,
      [interaction.user.id, giftTimestamp, timeToClaim, claimTime]
    )
    interaction.channel?.send({
      embeds: [
        successEmbed(
          `${interaction.member.displayName} ate a piece of broccoli!`
        ),
      ],
      components: [buttons],
    })
    return
  } catch {
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}! This gift has already been claimed!`
        ),
      ],
      ephemeral: true,
    })
  }
}
