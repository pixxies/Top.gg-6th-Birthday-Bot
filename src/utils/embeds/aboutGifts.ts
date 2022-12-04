import { EmbedBuilder } from '@discordjs/builders'
import { emoji } from '../emojis'

const aboutEmbed = new EmbedBuilder()
  .setTitle(`${emoji.gift} Top.gg 6th Anniversary Giveaway`)
  .setColor(16724838)
  .setThumbnail(`https://i.imgur.com/ZbbnG8I.png`)
  .setDescription(
    `It's our 6th birthday! To celebrate, we've organised a month of events and giveaways! This gift claiming event is part of those celebrations!`
  )
  .addFields(
    {
      name: '👀 How does it work?',
      value: `<:topggDotRed:921606879107502130> Every 1 to 2 hours, a gift will randomly spawn in <#264445053596991498>.\n<:topggDotRed:921606879107502130> Click **Claim** to add the gift to your inventory.\n<:topggDotRed:921606879107502130> Each gift = 1 entry to the giveaway.\n<:topggDotRed:921606879107502130> On January 2nd, one random gift will be chosen to win the grand prize.`,
    },
    {
      name: '🏆 What is the Grand Prize?',
      value: `<:topggDotRed:921606879107502130> 1 year of Discord Nitro.\n<:topggDotRed:921606879107502130> 1 month of Medal Premium\n<:topggDotRed:921606879107502130> $50 Top.gg Auctions coupon`,
    },
    {
      name: '💡 Tips',
      value: `<:topggDotRed:921606879107502130> Use </gifts:1041322408713388042> to see your inventory.\n<:topggDotRed:921606879107502130> Use </leaderboard:1041314403804512256> to see the top 10 players.`,
    }
  )
export default aboutEmbed
