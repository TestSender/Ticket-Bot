const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "песня, которую вы хотите воспроизвести следующей",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'песня, которую вы хотите воспроизвести следующей',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `результатов не найдено ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `Эта команда не поддерживает список воспроизведения ${inter.member}... повторите попытку ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.editReply({ content:`Трек вставлен в очередь... он будет воспроизводиться следующим 🎧`});

    }
}
