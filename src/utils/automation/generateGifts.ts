import { randomInt } from 'node:crypto'
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
import { giftGenMax, giftGenMin, spawnGuild } from '../../globals'
import { getGift } from '../functions/getGift'
import { giftCache } from '../functions/giftCache'

export async function generateGifts(client: Client) {
  const res = await query('SELECT * FROM pixxiebotbday.claimed', [])
  if (res.rows.length)
    res.rows.forEach((gift) => {
      giftCache.set(gift.giftid, gift.userid)
    })

  const spawnChannel = spawnGuild(client)?.channels.cache.find(
    (c) => c.name === 'dev-testing'
  ) as GuildTextBasedChannel

  function spawnGift() {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const gift = getGift()
    const giftEmbed = new EmbedBuilder()
      .setTitle(`A broccoli has spawned! :broccoli: :eyes:`)
      .setColor(gift?.color as ColorResolvable)
      .setImage('attachment://gift.png')

    const claimButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`gift_${timestamp}`)
        .setLabel('Eat!')
        .setEmoji('837999448441094164')
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
    const rand = randomInt(giftGenMin, giftGenMax)

    setTimeout(function () {
      spawnGift()
      loop()
    }, rand)
  })()
}
