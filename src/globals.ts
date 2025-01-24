import { Client } from 'discord.js'

const spawnGuild = (_client: Client) => {
  return _client.guilds.cache.get('675991746856878082')
}

const staffRoles = {
  mod: '827541997896204289',
  // mod: '934757861983150130',
  // team: '761916863847333928',
}

const questionTimer = 30000

const giftGenMin = 3600000
const giftGenMax = 7200000

export { spawnGuild, staffRoles, questionTimer, giftGenMin, giftGenMax }
