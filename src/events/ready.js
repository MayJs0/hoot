const { ActivityType, Presence } = require('discord.js');
const colorize = require('strcolorize');
module.exports = {
    name: 'ready',
    run: async(client) => { 
        colorize('[[HOOT](#5f9ea0)] conectado!', true)
        const status = [
            {
                name: `In development`,
                type: ActivityType.Custom,
            }
        ]
        setInterval(() => {
            const random = Math.floor(Math.random()* status.length)
            client.user.setActivity(status[random])
        }, 10000) 
    }
}