const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
});

client.once('ready', () => {
    console.log('Bot is online!');
});

// Comando para reproducir música
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!play')) {
        const args = message.content.split(' ');
        const query = args.slice(1).join(' ');

        if (!message.member.voice.channel) {
            return message.reply('Tenés que estar en un canal de voz para reproducir música!');
        }

        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
            return await message.reply('No me pude conectar al canal de voz!');
        }

        const track = await player.search(query, {
            requestedBy: message.user
        }).then(x => x.tracks[0]);

        if (!track) return message.reply('No encontré ningún resultado!');

        queue.play(track);

        return message.reply(`Reproduciendo **${track.title}**!`);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);

