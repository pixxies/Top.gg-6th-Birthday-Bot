import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js'

import aboutEmbed from '../utils/embeds/aboutGifts'

export const command = new SlashCommandBuilder()
  .setName('about')
  .setDescription('See what the gift claim event is about')
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  interaction.reply({ embeds: [aboutEmbed], ephemeral: true })
}
