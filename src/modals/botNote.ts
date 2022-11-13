// import {
//   ActionRowBuilder,
//   AttachmentBuilder,
//   ButtonBuilder,
//   ButtonStyle,
//   Client,
//   EmbedBuilder,
//   ModalSubmitInteraction,
// } from 'discord.js'
// import { query } from '../db'
// import { emoji } from '../utils/emojis'

export const modal = {
  name: 'botNote',
  VConly: false,
}

// export const execute = async (
//   _client: Client,
//   interaction: ModalSubmitInteraction
// ) => {
//   // const botId = interaction.fields.getTextInputValue('botId').trim()
//   // const bot = await _client.users.fetch(botId)
//   // const ownerId = interaction.fields.getTextInputValue('ownerId').trim()
//   // const noteContent = interaction.fields.getTextInputValue('noteContent')
//   // const attachments = interaction.fields.getTextInputValue('attachments')

//   // const attachmentsArray = attachments.split(/\r?\n/)
//   // const filesArray: Array<AttachmentBuilder> = []
//   // attachmentsArray.map((attachment) => {
//   //   if (attachment)
//   //     filesArray.push(new AttachmentBuilder(attachment, { name: attachment }))
//   // })

//   // const newBotNote = new EmbedBuilder()
//   //   .setTitle(`${bot.username}`)
//   //   .setColor('#ff3366')
//   //   .setAuthor({
//   //     name: interaction.user.username,
//   //     iconURL: interaction.user.displayAvatarURL(),
//   //   })
//   //   .setThumbnail(bot.displayAvatarURL())
//   //   .setDescription(`${noteContent}`)
//   //   .addFields([
//   //     { name: 'Bot', value: `<@${bot.id}>\n\`${bot.id}\``, inline: true },
//   //     { name: 'Owner', value: `<@${ownerId}>\n\`${ownerId}\``, inline: true },
//   //   ])
//   //   .setTimestamp()

//   // const response = await botNotes(_client).send({
//   //   embeds: [newBotNote],
//   //   files: filesArray,
//   //   components: [],
//   // })

//   // const noteButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
//   //   new ButtonBuilder()
//   //     .setCustomId(`editBotNote_${response.createdTimestamp}`)
//   //     .setLabel(`Edit`)
//   //     .setEmoji('1014200880523923527')
//   //     .setStyle(ButtonStyle.Primary),
//   //   new ButtonBuilder()
//   //     .setCustomId(`deleteBotNote_${response.createdTimestamp}`)
//   //     .setLabel(`Delete`)
//   //     .setEmoji('1014181375760400455')
//   //     .setStyle(ButtonStyle.Danger)
//   // )
//   // response.edit({ components: [noteButtons] })

//   // const savedAttachments: Array<string> = []
//   // if (response.attachments.size) {
//   //   response.attachments.forEach((attachment) => {
//   //     savedAttachments.push(attachment.proxyURL)
//   //   })
//   // }

//   // const noteURL = `https://discord.com/channels/${response.guildId}/${response.channelId}/${response.id}`

//   // const sql = `INSERT INTO bot_notes (timestamp, bot_id, owner_id, mod_id, note, attachments, note_url) VALUES ($1, $2, $3, $4, $5, $6, $7)`
//   // await query(sql, [
//   //   response.createdTimestamp,
//   //   botId,
//   //   ownerId,
//   //   interaction.user.id,
//   //   noteContent,
//   //   JSON.stringify(savedAttachments),
//   //   noteURL,
//   // ])

//   // interaction.reply({
//   //   content: `${emoji.online} **New note added for <@${bot.id}>!**\n[View note](${noteURL})`,
//   // })
// }
