import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js'

import aboutEmbed from '../utils/embeds/aboutGifts'

export const command = new SlashCommandBuilder()
  .setName('about')
  .setDescription('About the Broccoli Eating Contest')
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  interaction.reply({ embeds: [aboutEmbed], ephemeral: true })
}
