module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится... повторите попытку ? ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Раньше не играла музыка ${inter.member}... попробуйте еще раз ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Воспроизведение **предыдущей** дорожки ✅`, ephemeral: true});
}
