const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'adjust',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'Количество звука',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `На данный момент не играет музыка ${inter.member}... попробуй ещё раз ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.volume === vol) return inter.reply({ content: `Громкость, которую вы хотите изменить, уже является текущей ${inter.member}... попробуй ещё раз ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `Объем был изменен на **${vol}**/**${maxVol}**% 🔊` : `Что-то пошло не так ${inter.member}... попробуй ещё раз ? ❌`});
    },
};