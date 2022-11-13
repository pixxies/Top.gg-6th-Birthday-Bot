import { Client } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'

const eventsPath = path.join(__dirname, 'events')

const eventHandler = (client: Client) => {
  fs.readdirSync(eventsPath).forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const event = require(path.join(eventsPath, file))
    const eventName = file.split('.')[0]
    if (!eventName) return console.error(`${file} is not a valid event`)
    client.on(eventName, (...args) => event.default(client, ...args))
    console.log('Registered event:', eventName)
  })
}

export default eventHandler
