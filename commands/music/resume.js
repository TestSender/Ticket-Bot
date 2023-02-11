module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `Трек уже работает, ${inter.member}... повторите попытку ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `Текущий трек ${queue.current.title} возобновлён ✅` : `Что-то пошло не так ${inter.member}... повторите попытку ? ❌`});
    },
};
