import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { query } from '../db'
import { errorEmbed } from '../utils/embeds'
// import { emoji } from '../utils/emojis'
import { giftCache } from '../utils/functions/giftCache'

export const command = new SlashCommandBuilder()
  .setName('stomach')
  .setDescription("See how many broccoli you've eaten!")
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  const res = await query(
    'SELECT userid, COUNT(userid) as gifts, RANK() OVER (ORDER BY COUNT(userid) DESC) user_rank FROM pixxiebotbday.claimed GROUP BY userid ORDER BY gifts DESC',
    []
  )
  if (!res.rows.length)
    return interaction.reply({
      embeds: [errorEmbed('No leaderboard found')],
      ephemeral: true,
    })

  const myRank = res.rows.find((r) => r.userid === interaction.user.id)
  if (!myRank)
    return interaction.reply({
      embeds: [
        errorEmbed(
          `You haven't eaten any broccoli yet!`,
          `Broccoli spawn randomly in <#683346276607197187>! When you see one, make sure to quickly click the "Eat!" button before anyone else!`
        ),
      ],
      ephemeral: true,
    })

  const myGifts = new Map(
    [...giftCache].filter(([k, v]) => k && v === interaction.user.id)
  )

  const lastClaimed = [...myGifts].reduce((a, e) => (e[1] > a[1] ? a : e))

  const leaderboardEmbed = new EmbedBuilder()
    .setTitle(`🥦 ${interaction.user.displayName}'s Stomach`)
    .setColor(`#81C02F`)
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields(
      {
        name: 'My Rank',
        value: `🏆 **#${myRank.user_rank}** of ${res.rowCount} eaters`,
      },
      {
        name: 'Broccolis Eaten',
        value: `🥦 ${myRank.gifts} of ${[...giftCache].length}`,
        inline: true,
      },
      {
        name: 'Last Broccoli Eaten',
        value: `⏰ <t:${lastClaimed[0]}:R>`,
        inline: true,
      },
      {
        name: 'Chance of Winning',
        value: `🤞 \`${((myRank.gifts / [...giftCache].length) * 100).toFixed(
          2
        )}%\``,
        inline: true,
      }
    )

  interaction.reply({ embeds: [leaderboardEmbed], ephemeral: true })
  return
}
