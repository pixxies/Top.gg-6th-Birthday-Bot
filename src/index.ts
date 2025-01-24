import { Client, Partials, GatewayIntentBits } from 'discord.js'
import commandHandler from './commandHandler'
import { generateGifts } from './utils/automation/generateGifts'

// Configure client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
  ],
  // Enabling all partials
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
})

// Start bot
client.on('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}!`)
  client.user?.setPresence({
    status: 'online',
    activities: [
      {
        name: 'you party! 🎉',
        type: 3,
      },
    ],
  })
  generateGifts(client)
})

// Register commands
commandHandler(client)

client.login(process.env.DISCORD_TOKEN)
