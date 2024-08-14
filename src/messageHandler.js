const { encaminharMensagemParaSecundarios } = require('./utils');
const { agendarMensagem } = require('./scheduler');

// Função para manipular mensagens
function handleMessage(bot, msg, config) {
    if (msg.chat.id == process.env.CHAT_PRINCIPAL) {
        if (isChatPrincipalAdmin(bot, msg)) {
            if (msg.text || msg.photo || msg.video) {
                console.log(`Mensagem recebida no chat principal: ${msg}`);
                if (msg.text && msg.text.startsWith('/agendar')) {
                    agendarMensagem(bot, msg, config);
                } else {
                    encaminharMensagemParaSecundarios(bot, msg, config.chatsSecundarios);
                }
            } else {
                encaminharMensagemParaSecundarios(bot, msg, config.chatsSecundarios);
            }
        }
    }
}

// Função para enviar mensagens agendadas
function encaminharMensagensAgendadas(bot, config) {
    config.mensagensAgendadas.forEach((scheduledMessage) => {
        const message = scheduledMessage.message;
        const messageType = scheduledMessage.messageType;

        if (messageType === '/msg') {
            config.chatsSecundarios.forEach((chatId) => {
                bot.sendMessage(chatId, message);
            });
        } else if (messageType === '/img') {
            const photoUrl = message;
            config.chatsSecundarios.forEach((chatId) => {
                bot.sendPhoto(chatId, photoUrl);
            });
        } else if (messageType === '/video') {
            const videoUrl = message;
            config.chatsSecundarios.forEach((chatId) => {
                bot.sendVideo(chatId, videoUrl);
            });
        }
    });
}

// Função para verificar se o remetente é um administrador do chat principal
async function isChatPrincipalAdmin(bot, msg) {
    const chat = msg.chat;
    const user = msg.from;

    if (chat.type === 'group' || chat.type === 'supergroup') {
        const admins = await bot.getChatAdministrators(chat.id);
        for (const admin of admins) {
            if (admin.user.id === user.id) {
                return true;
            }
        }
    }

    return false;
}

module.exports = { handleMessage, encaminharMensagensAgendadas };
