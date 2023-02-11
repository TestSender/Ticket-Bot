const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'сохранить текущий трек!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Длительность:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Трек от:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Просмотры :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'Ссылка на трек:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`с сервера ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `Я отправил вам название музыки в личные сообщения ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Не удалось отправить вам личное сообщение... попробуйте еще раз ? ❌`, ephemeral: true });
        });
    },
};