module.exports = {
    name: 'stop',
    description: 'Остановить трек',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `Музыка остановилась на этом сервере, увидимся в следующий раз ✅`});
    },
};