const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "удалить песню из очереди",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'название/адрес трека, который вы хотите удалить',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'место в очереди, на котором стоит песня',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Вы должны использовать один из вариантов, чтобы удалить песню ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                return inter.reply({ content: `удалён ${track} из очереди ✅` });
            }

        }

        return inter.reply({ content: `не мог найти ${track} ${inter.member}... попробуйте использовать URL или полное название песни ? ❌`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `Эта доза трека, кажется, не существует ${inter.member}...  повторите попытку ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return inter.reply({ content: `удалён ${trackname} с очереди ✅` });
        }


         
    }
}