import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  ColorResolvable,
  EmbedBuilder,
  GuildTextBasedChannel,
} from 'discord.js'
import { query } from '../../db'
import { giftGenMax, giftGenMin, topggGuild } from '../../globals'
import { getGift } from '../functions/getGift'
import { giftCache } from '../functions/giftCache'

export async function generateGifts(client: Client) {
  const res = await query('SELECT * FROM claimed', [])
  if (res.rows.length)
    res.rows.forEach((gift) => {
      giftCache.set(gift.giftid, gift.userid)
    })

  const spawnChannel = topggGuild(client)?.channels.cache.find(
    (c) => c.name === 'bot-reviewers'
  ) as GuildTextBasedChannel

  function spawnGift() {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const gift = getGift()
    const giftEmbed = new EmbedBuilder()
      .setTitle(`A birthday gift has spawned! :eyes:`)
      .setColor(gift?.color as ColorResolvable)
      .setImage('attachment://gift.png')

    const claimButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`gift_${timestamp}`)
        .setLabel('Claim!')
        .setEmoji('🎉')
        .setStyle(ButtonStyle.Primary)
    )

    spawnChannel.send({
      embeds: [giftEmbed],
      files: [
        new AttachmentBuilder(gift?.image as string, { name: 'gift.png' }),
      ],
      components: [claimButton],
    })
  }
  ;(function loop() {
    const rand =
      Math.round(Math.random() * (giftGenMax - giftGenMin)) + giftGenMin
    setTimeout(function () {
      spawnGift()
      loop()
    }, rand)
  })()
}
