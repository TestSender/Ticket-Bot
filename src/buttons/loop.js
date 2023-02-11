const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 

    const methods = ['отключён', 'трек', 'очередь'];

    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится... повторите попытку ? ❌`, ephemeral: true });

    const repeatMode = queue.repeatMode

    if (repeatMode === 0) queue.setRepeatMode( QueueRepeatMode.TRACK)

    if (repeatMode === 1 ) queue.setRepeatMode( QueueRepeatMode.QUEUE)

    if (repeatMode === 2) queue.setRepeatMode( QueueRepeatMode.OFF)
    
    return inter.reply({ content: `Режим повтора установлен на **${methods[queue.repeatMode]}**.✅`})



}