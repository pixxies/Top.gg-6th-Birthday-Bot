import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { query } from '../db'
import { errorEmbed } from '../utils/embeds'
import { emoji } from '../utils/emojis'

export const command = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('See the top 10 gift claimers!')
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  const res = await query(
    'SELECT userid, COUNT(userid) as gifts, RANK() OVER (ORDER BY COUNT(userid) DESC) user_rank FROM claimed GROUP BY userid ORDER BY gifts DESC LIMIT 10',
    []
  )
  if (!res.rows.length)
    return interaction.reply({ embeds: [errorEmbed('No leaderboard found')] })

  const leaderboardEmbed = new EmbedBuilder()
    .setTitle(`${emoji.gift} Top.gg Birthday Gift Leaderboard`)
    .setColor(`#ff3366`)
    .setDescription(
      res.rows
        .map(
          (r) =>
            `**${r.user_rank}.** <@${r.userid}> - **${r.gifts}** ${
              r.gifts > 1 ? 'gifts' : 'gift'
            }`
        )
        .join('\n')
    )

  interaction.reply({ embeds: [leaderboardEmbed], ephemeral: true })
  return
}
