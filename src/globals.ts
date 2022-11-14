import { Client } from 'discord.js'

const topggGuild = (_client: Client) => {
  return _client.guilds.cache.get('264445053596991498')
}

const staffRoles = {
  trialbr: '767392998157451265',
  br: '767389896133443625',
  trialmod: '364144633451773953',
  mod: '304313580025544704',
  brmentor: '774710870185869342',
  cm: '695153281105920070',
  team: '742408262648987748',
}

const questionTimer = 10000

const giftGenMin = 3600000
const giftGenMax = 7200000

export { topggGuild, staffRoles, questionTimer, giftGenMin, giftGenMax }
