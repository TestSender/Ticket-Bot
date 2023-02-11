const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'включить или отключить зацикливание песен или всей очереди',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'какое действие вы хотите выполнить в цикле',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Очередь', value: 'enable_loop_queue' },
            { name: 'Отключить', value: 'disable_loop'},
            { name: 'Трек', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`Предварительно необходимо отключить текущую музыку в режиме петли (/loop Disable) ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `Режим повтора **включен**, вся очередь будет повторяться бесконечно 🔁` : `Что-то пошло не так ${inter.member}... повторите попытку ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `Режим повтора **отключен**` : `Что-то пошло не так ${inter.member}... повторите попытку ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`Предварительно необходимо отключить текущую музыку в режиме петли (/loop Disable) ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `Режим повтора **включен**, текущая песня будет повторяться бесконечно (вы можете завершить цикл с помощью /loop disabled)` : `Что-то пошло не так ${inter.member}... повторите попытку ? ❌` });
                break
            }
        }
       
    },
};