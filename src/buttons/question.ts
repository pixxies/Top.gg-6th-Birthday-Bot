import { ButtonInteraction, Client } from 'discord.js'
import { query } from '../db'
import { errorEmbed, infoEmbed, successEmbed } from '../utils/embeds'
import { isStaffMember } from '../utils/perms'
import questions from '../assets/quiz/questions.json'
import { questionTimer } from '../globals'

export const button = {
  name: 'question',
}

export const execute = async (
  _client: Client,
  interaction: ButtonInteraction
) => {
  if (!interaction.inCachedGuild()) return

  if (await isStaffMember(interaction.user))
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}! Staff cannot participate!`
        ),
      ],
      ephemeral: true,
    })

  const questionIndex = Number(
    interaction.customId
      .substring(interaction.customId.indexOf('_') + 1)
      .substring(0, 1)
  )

  const question = questions[questionIndex]

  if (!question) return

  const answerNumber = interaction.customId
    .substring(interaction.customId.indexOf('_') + 1)
    .substring(6)

  const res = await query(
    'SELECT * FROM quiz WHERE userid = $1 AND question = $2',
    [interaction.user.id, questionIndex + 1]
  )

  if (res.rows.length)
    return interaction.editReply({
      embeds: [
        errorEmbed(`${interaction.user.username}, you've already answered!`),
      ],
    })

  const timeToAnswer = Math.round(
    interaction.createdTimestamp - interaction.message.createdTimestamp
  )

  const timerEnd = questionTimer - timeToAnswer

  const correct = question.answer === answerNumber ? 1 : 0

  interaction.reply({
    embeds: [
      infoEmbed(
        `We saved your answer, ${interaction.user.username}!`,
        `Make sure your DMs are open to see if your answer was correct!`
      ),
    ],
    ephemeral: true,
    fetchReply: true,
  })

  setTimeout(() => {
    if (correct === 1)
      interaction.user.send({
        embeds: [
          successEmbed(`You answered question ${questionIndex + 1} correctly!`),
        ],
      })
    else
      interaction.user.send({
        embeds: [
          errorEmbed(
            `Question #${questionIndex + 1}`,
            `You answered **${
              Object.values(question.options)[Number(answerNumber) - 1]
            }**!\n\nThe correct answer is **${
              Object.values(question.options)[Number(question.answer) - 1]
            }**!`
          ),
        ],
      })
  }, timerEnd)

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
