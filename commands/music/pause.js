module.exports = {
    name: 'pause',
    description: 'Приостановить трек на паузу',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'Трек в настоящее время приостановлен!', ephemeral: true})

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Текущий трек ${queue.current.title} приостановлен ✅` : `Something went wrong ${inter.member}... повторите попытку ? ❌` });
    },
};
