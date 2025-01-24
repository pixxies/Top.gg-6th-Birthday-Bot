import { EmbedBuilder } from '@discordjs/builders'
import { emoji } from '../emojis'

const aboutEmbed = new EmbedBuilder()
  .setTitle(
    `${emoji.pixxiebot} PixxieBot's 4th Birthday Broccoli Eating Contest`
  )
  .setColor(16724838)
  .setThumbnail(`https://i.imgur.com/ifveORz.png`)
  .setDescription(
    `It's our 4th birthday! To celebrate, we've organised a bunch of events and giveaways! This broccoli eating contest is part of those celebrations!`
  )
  .addFields(
    {
      name: '👀 How does it work?',
      value: `- Every 1 to 2 hours, broccoli will randomly appear in <#683346276607197187>.\n- Click **Eat** to eat the broccoli.\n- One of the broccoli is secretly a magic broccoli but looks exactly the same as a regular broccoli.\n- On March 5th, the eater of the magic broccoli will be revealed and will win the grand prize!`,
    },
    {
      name: '🏆 What is the Grand Prize?',
      value: `- 1 year of Discord Nitro\n- 1 month of PixxieBot Premium\n- Limited Edition PixxieBot stickers in the mail`,
    },
    {
      name: '💡 Tips',
      value: `- Use </stomach:1209826330628071467> to see how many broccoli you've eaten.\n- Use </leaderboard:1209826330628071468> to see the top 10 contestants.`,
    }
  )
export default aboutEmbed
