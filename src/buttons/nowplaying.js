const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const track = queue.current;

    const methods = ['отключён', 'трек', 'очередь'];

    const timestamp = queue.getPlayerTimestamp();

    const trackDuration = timestamp.progress == 'Infinity' ? 'Бесконечный (эфир)' : track.duration;

    const progress = queue.createProgressBar();
    

    const embed = new EmbedBuilder()
    .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setThumbnail(track.thumbnail)
    .setDescription(`Громкость **${queue.volume}**%\nДлительность **${trackDuration}**\nПрогресс ${progress}\nРежим повтора **${methods[queue.repeatMode]}**\nЗапросил ${track.requestedBy}`)
    .setFooter({ text: 'Музыка превыше всего - Сделано с душой от Агент#0707 ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})
    .setColor('ff0000')
    .setTimestamp()

    inter.reply({ embeds: [embed], ephemeral: true });
}