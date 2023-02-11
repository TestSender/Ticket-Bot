const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Отклик бота!",
    async execute({ client, inter }) {

        const m = await inter.reply("Отклик?")
        inter.editReply(`Понг! Ответ API Discord ${Math.round(client.ws.ping)}МС 🛰️, Рассчитано последнее сердцебиение ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} назад`)

    },
};