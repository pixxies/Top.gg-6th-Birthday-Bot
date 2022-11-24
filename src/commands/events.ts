import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  CommandInteraction,
  ComponentType,
  EmbedBuilder,
  InteractionReplyOptions,
  InteractionUpdateOptions,
  SlashCommandBuilder,
} from 'discord.js'
import { infoEmbed } from '../utils/embeds'

export const command = new SlashCommandBuilder()
  .setName('events')
  .setDescription('Browse our list of birthday events!')
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  const guildEventsRaw = await interaction.guild?.scheduledEvents.fetch()
  const guildEvents = guildEventsRaw?.sort((a, b) =>
    a.scheduledStartTimestamp && b.scheduledStartTimestamp
      ? a.scheduledStartTimestamp - b.scheduledStartTimestamp
      : 0
  )
  if (guildEvents?.size === 0)
    return interaction.reply({
      embeds: [
        infoEmbed(
          'Our birthday celebreations are over!',
          'Sign up for notifications of future events and giveaways in <#966027989374627840>'
        ),
      ],
    })
  if (!guildEvents?.size) return
  const eventSchedule: Array<InteractionReplyOptions> = guildEvents.map((e) => {
    const embed = new EmbedBuilder()
      .setColor('#ff3366')
      .setImage(e.coverImageURL({ size: 2048 }))
      .setTitle(`${e.name}`)
      .setDescription(`${e.description}`)
      .addFields({
        name: `Starts`,
        value: `<t:${Math.round(
          (e.scheduledStartTimestamp as number) / 1000
        )}:F>\n(<t:${Math.round(
          (e.scheduledStartTimestamp as number) / 1000
        )}:R>)`,
        inline: true,
      })
      .toJSON()
    if (e.scheduledEndTimestamp)
      embed.fields?.push({
        name: `Ends`,
        value: `<t:${Math.round(
          (e.scheduledEndTimestamp as number) / 1000
        )}:F>\n(<t:${Math.round(
          (e.scheduledEndTimestamp as number) / 1000
        )}:R>)`,
        inline: true,
      })
    const buttons = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setEmoji('1045340877578580010')
          .setCustomId(`prev`)
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(e === guildEvents.first() ? true : false),
        new ButtonBuilder()
          .setEmoji('1027277740551975063')
          .setURL(`https://discord.com/events/${e.guildId}/${e.id}`)
          .setStyle(ButtonStyle.Link)
          .setLabel('Join'),
        new ButtonBuilder()
          .setEmoji('1045340879038206042')
          .setCustomId(`next`)
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(e === guildEvents.last() ? true : false)
      )
      .toJSON()
    return {
      embeds: [embed],
      components: [buttons],
      fetchReply: true,
      ephemeral: true,
    } as InteractionReplyOptions
  })
  if (!eventSchedule[0]) return
  const message = await interaction.reply(eventSchedule[0])
  let E = 0

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    idle: 30000,
  })

  collector.on('collect', async (i) => {
    if (i.customId && i.customId === 'next') E++
    else if (i.customId && i.customId === 'prev') --E
    if (eventSchedule[E])
      await i.update(eventSchedule[E] as InteractionUpdateOptions)
    else i.deferUpdate()
  })

  collector.on('end', async () => {
    await interaction.editReply({ components: [] })
  })

  return
}
