module.exports = {
    name: 'skip',
    description: 'Пропустить трек',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

          if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `Текущая песня ${queue.current.title} пропущенна ✅` : `Что-то пошло не так ${inter.member}... попробуй ещё раз ? ❌`});
    },
};