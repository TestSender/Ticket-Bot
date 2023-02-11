module.exports = {
    name: 'clear',
    description: 'Очистить очередь воспроизведения',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Нет музыки в очереди после текущей ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        await queue.clear();

        inter.reply(`Очередь была очищена 🗑️`);
    },
};