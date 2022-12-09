import { ButtonInteraction, Client } from 'discord.js'
import { query } from '../db'
import { infoEmbed } from '../utils/embeds'
// import { isStaffMember } from '../utils/perms'
import questions from '../assets/quiz/questions.json'

export const button = {
  name: 'question',
}

export const execute = async (
  _client: Client,
  interaction: ButtonInteraction
) => {
  if (!interaction.inCachedGuild()) return

  // if (await isStaffMember(interaction.user))
  //   return interaction.reply({
  //     embeds: [
  //       errorEmbed(
  //         `Sorry ${interaction.user.username}! Staff cannot participate!`
  //       ),
  //     ],
  //     ephemeral: true,
  //   })

  const questionIndexStr = interaction.customId.substring(
    interaction.customId.indexOf('_') + 1
  )
  const questionIndex = Number(
    questionIndexStr.substring(0, questionIndexStr.indexOf('_'))
  )

  const question = questions[questionIndex]

  if (!question) return

  const answerNumber = questionIndexStr.substring(
    questionIndexStr.indexOf('_') + 5
  )

  const res = await query(
    'SELECT * FROM quiz WHERE userid = $1 AND question = $2',
    [interaction.user.id, questionIndex + 1]
  )

  if (res.rows.length) return interaction.deferUpdate()

  const timeToAnswer = Math.round(
    interaction.createdTimestamp - interaction.message.createdTimestamp
  )

  const correct = question.answer === answerNumber ? 1 : 0

  interaction.reply({
    embeds: [
      infoEmbed(
        `You answered ${
          Object.values(question.options)[Number(answerNumber) - 1]
        }`
      ),
    ],
    ephemeral: true,
    fetchReply: true,
  })

  query(
    `INSERT INTO quiz (userid, question, answer, time, correct) VALUES ($1, $2, $3, $4, $5)`,
    [
      interaction.user.id,
      questionIndex + 1,
      answerNumber,
      timeToAnswer,
      correct,
    ]
  )
  return
}
