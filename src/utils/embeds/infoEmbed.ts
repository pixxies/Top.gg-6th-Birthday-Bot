import { EmbedBuilder } from 'discord.js'
import { emoji } from '../emojis'

export const infoEmbed = (title: string, message?: string) => {
  const res = new EmbedBuilder()
    .setColor('#00BBFF')
    .setTitle(`${emoji.blueinfo} ${title}`)
  if (message) res.setDescription(message)
  return res
}
