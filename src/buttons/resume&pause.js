module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится... повторите попытку ? ❌`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `Текущий трек ${queue.current.title} приостановлен ✅` : `Текущий трек ${queue.current.title} воспроизводится ✅`}`, ephemeral: true});
}