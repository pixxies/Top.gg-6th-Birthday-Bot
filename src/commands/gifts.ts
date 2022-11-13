import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { query } from '../db'
import { errorEmbed } from '../utils/embeds'
import { emoji } from '../utils/emojis'
import { giftCache } from '../utils/functions/giftCache'

export const command = new SlashCommandBuilder()
  .setName('gifts')
  .setDescription("See how many gifts you've claimed")
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  const res = await query(
    'SELECT userid, COUNT(userid) as gifts, RANK() OVER (ORDER BY COUNT(userid) DESC) user_rank FROM claimed GROUP BY userid ORDER BY gifts DESC',
    []
  )
  if (!res.rows.length)
    return interaction.reply({ embeds: [errorEmbed('No leaderboard found')] })

  const myRank = res.rows.find((r) => r.userid === interaction.user.id)
  if (!myRank)
    return interaction.reply({
      embeds: [
        errorEmbed(
          `You haven't claimed any gifts yet!`,
          `Gifts spawn randomly in <#264445053596991498>! When you see one, make sure to quickly click the "Claim!" button before anyone else!`
        ),
      ],
    })

  const myGifts = new Map(
    [...giftCache].filter(([k, v]) => k && v === interaction.user.id)
  )

  const lastClaimed = [...myGifts].reduce((a, e) => (e[1] > a[1] ? a : e))

  const leaderboardEmbed = new EmbedBuilder()
    .setTitle(`${emoji.gift} ${interaction.user.username}'s inventory`)
    .setColor(`#ff3366`)
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields(
      {
        name: 'My Rank',
        value: `🏆 **#${myRank.user_rank}** of ${res.rowCount} players`,
        inline: true,
      },
      {
        name: 'Gifts Claimed',
        value: `🎉 ${myRank.gifts} of ${[...giftCache].length}`,
        inline: true,
      },
      {
        name: 'Last Gift Claimed',
        value: `⏰ <t:${lastClaimed[0]}:R>`,
        inline: true,
      }
    )

  interaction.reply({ embeds: [leaderboardEmbed], ephemeral: true })
  return
}
