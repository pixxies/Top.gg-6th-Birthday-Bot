import { ButtonInteraction, Client } from 'discord.js'
import aboutEmbed from '../utils/embeds/aboutGifts'

export const button = {
  name: 'aboutGifts',
}

export const execute = async (
  _client: Client,
  interaction: ButtonInteraction
) => {
  if (!interaction.inCachedGuild()) return
  interaction.reply({ embeds: [aboutEmbed], ephemeral: true })
}
