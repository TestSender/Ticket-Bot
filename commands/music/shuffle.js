module.exports = {
    name: 'shuffle',
    description: 'shuffle the track',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Нет музыки в очереди после текущей ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`Очередь перемешана **${queue.tracks.length}** трек(и) ! ✅`});
    },
};