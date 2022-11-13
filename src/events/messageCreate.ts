import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
  Message,
  TextChannel,
} from 'discord.js'
import { topggGuild } from '../globals'

const messageCreate = async (_client: Client, message: Message) => {
  if (
    message.guild &&
    message.content.toLowerCase() === 'yardim' &&
    message.guild.id !== topggGuild(message.client)?.id
  ) {
    message.reply('yardım')
  }

  if (
    message.guild &&
    message.guild.id === topggGuild(_client)?.id &&
    message.channelId === '396848636081733632' &&
    message.system &&
    !message.author.bot &&
    message.embeds[0]?.fields.find((m) => m.name === 'rule_name')?.value ===
      'Naughty Words Alert'
  ) {
    const channel = <TextChannel>(
      message.client.channels.cache.get('817819526078136380')
    )

    const userReport = new EmbedBuilder()
      .setColor('#ff3366')
      .setAuthor({
        name: `${message.author.username}#${message.author.discriminator}`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `**Sent in <#${
          message.embeds[0]?.fields.find((m) => m.name === 'channel_id')?.value
        }> <t:${Math.round(message.createdTimestamp / 1000)}:R>:**\n> ${
          message.embeds[0].description
        }`
      )
      .addFields(
        {
          name: 'AutoMod Rule',
          value: `${
            message.embeds[0]?.fields.find((m) => m.name === 'rule_name')?.value
          }`,
          inline: true,
        },
        {
          name: 'Keyword rule',
          value: `\`${
            message.embeds[0]?.fields.find((m) => m.name === 'keyword')?.value
          }\``,
          inline: true,
        },
        {
          name: 'Flagged word',
          value: `${
            message.embeds[0]?.fields.find(
              (m) => m.name === 'keyword_matched_content'
            )?.value
          }`,
          inline: true,
        }
      )
      .setTimestamp(message.createdTimestamp)
      .setFooter({ text: 'Reported by AutoMod' })

    const reportMessage = await channel.send({
      content: `<@${message.author.id}>\n\`${message.author.id}\``,
      embeds: [userReport],
    })

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/channels/${message.guildId}/${
            message.embeds[0]?.fields.find((m) => m.name === 'channel_id')
              ?.value
          }/${
            message.embeds[0]?.fields.find(
              (m) => m.name === 'flagged_message_id'
            )?.value
          }`
        )
        .setLabel('Original message'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`
        )
        .setLabel('AutoMod log'),
      new ButtonBuilder()
        .setCustomId(`dismissReport_${reportMessage.id}`)
        .setStyle(ButtonStyle.Danger)
        .setEmoji('1014181375760400455')
    )

    reportMessage.edit({ components: [buttons] })
  }
}

export default messageCreate
