import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  CommandInteraction,
  EmbedBuilder,
  GuildTextBasedChannel,
  SlashCommandBuilder,
} from 'discord.js'
import questions from '../assets/quiz/questions.json'
// import { questionTimer } from '../globals'
// import { emoji } from '../utils/emojis'

export const command = new SlashCommandBuilder()
  .setName('question')
  .setDescription('Allows Mac to start and run the birthday quiz')
  .setDMPermission(false)
  .addNumberOption((option) =>
    option
      .setName('number')
      .setDescription('Loads the question in the channel')
      .setRequired(true)
  )

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  if (interaction.user.id !== '491002268401926145') return
  const quizChannel = interaction.channel as GuildTextBasedChannel
  const number = interaction.options.get('number')?.value as number
  const question = questions[number - 1]
  if (!question?.options) return
  // const timerDuration = questionTimer
  // const timerStart = new Date()
  // const timerEnd = Math.round(
  //   timerStart.setSeconds(timerStart.getSeconds() + timerDuration / 1000) / 1000
  // )
  const blankEmoji = '<:blank:1041352030641471548>'
  const optionEmoji = [
    '<:a_:1041340827127005254>',
    '<:b_:1041340828368515102>',
    '<:c_:1041340829517762611>',
    '<:d_:1041340830859927592>',
  ]

  const options = Object.values(question.options)
  const answerOptions = []
  for (let i = 0; i < 4; i++) {
    const q = options[i]
    answerOptions.push(`${blankEmoji} ${optionEmoji[i]} ${q}`)
  }

  const qEmbed = new EmbedBuilder()
    .setTitle(`Question #${number}: ${question.question}`)
    .setColor('#ff3366')
    .setDescription(
      `${answerOptions.join('\n')}` //\n\n**Timer ends:** <t:${timerEnd}:R>`
    )

  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`question_${number - 1}_opt_1`)
      .setEmoji('1041340827127005254')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`question_${number - 1}_opt_2`)
      .setEmoji('1041340828368515102')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`question_${number - 1}_opt_3`)
      .setEmoji('1041340829517762611')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`question_${number - 1}_opt_4`)
      .setEmoji('1041340830859927592')
      .setStyle(ButtonStyle.Secondary)
  )

  quizChannel.send({
    embeds: [qEmbed],
    components: [buttons],
  })
  interaction.reply({ content: `Question #${number} posted`, ephemeral: true })

  // setTimeout(() => {
  //   const buttonEmoji = [
  //     '1041345328055586856',
  //     '1041345329003507794',
  //     '1041345330853195837',
  //     '1041345332337971230',
  //   ]
  //   const correctAnswer = Number(question.answer)

  //   const revealAnswer = []
  //   for (let i = 0; i < 4; i++) {
  //     const q = options[i]
  //     if (correctAnswer === i + 1)
  //       revealAnswer.push(`${emoji.online} ${optionEmoji[i]} **${q}**`)
  //     else revealAnswer.push(`${blankEmoji} ${optionEmoji[i]} ${q}`)
  //   }

  //   const lockedButtons: Array<ButtonBuilder> = []
  //   for (let i = 0; i < 4; i++) {
  //     lockedButtons.push(
  //       new ButtonBuilder()
  //         .setCustomId(`question_${number - 1}_opt_${i + 1}`)
  //         .setEmoji(buttonEmoji[i] as string)
  //         .setStyle(
  //           correctAnswer === i + 1 ? ButtonStyle.Success : ButtonStyle.Danger
  //         )
  //         .setDisabled(true)
  //     )
  //   }
  //   const buttonsNew = new ActionRowBuilder<ButtonBuilder>().addComponents(
  //     lockedButtons
  //   )
  //   const qEmbedNew = qEmbed.setDescription(revealAnswer.join('\n'))
  //   postedQuestion.edit({
  //     embeds: [qEmbedNew],
  //     components: [buttonsNew],
  //   })
  // }, timerDuration)
}
