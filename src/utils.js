// Função utilitária para encaminhar mensagens para chats secundários
function encaminharMensagemParaSecundarios(bot, msg, chatsSecundarios) {
    chatsSecundarios.forEach((chatId) => {
        if (msg.text) {
            bot.sendMessage(chatId, msg.text);
        } else if (msg.photo) {
            bot.sendPhoto(chatId, msg.photo[msg.photo.length - 1].file_id, { caption: msg.caption });
        } else if (msg.video) {
            bot.sendVideo(chatId, msg.video.file_id, { caption: msg.caption });
        }
    });
}

module.exports = { encaminharMensagemParaSecundarios };
