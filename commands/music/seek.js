const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'перейти назад или вперед в песне',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'время, которое вы хотите пропустить',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`Указанное время больше, чем общее время текущей песни ${inter.member}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `Время, установленное для текущей песни **${ms(timeToMS, { long: true })}** ✅`});
    },
};