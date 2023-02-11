module.exports = {
    name: 'back',
    description: "Вернуться к предыдущему треку",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Раньше не играла музыка ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Воспроизведение  **предыдущего** трека ✅`});
    },
};