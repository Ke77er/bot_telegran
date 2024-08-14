const { saveConfig } = require('./config');
const { isChatPrincipalAdmin } = require('./messageHandler');

// Função para manipular comandos administrativos
async function handleAdminCommands(bot, msg, config) {
    if (msg.chat.type === 'private' && await isChatPrincipalAdmin(bot, msg)) {
        if (msg.text.startsWith('/setchatprincipal')) {
            const newChatPrincipalId = msg.text.split(' ')[1];
            if (newChatPrincipalId) {
                process.env.CHAT_PRINCIPAL = newChatPrincipalId;
                saveConfig(config);
                bot.sendMessage(msg.chat.id, `Chat principal atualizado para: ${newChatPrincipalId}`);
            } else {
                bot.sendMessage(msg.chat.id, 'Por favor, forneça um ID de chat válido.');
            }
        } else if (msg.text.startsWith('/addchatsecundario')) {
            const newChatSecundarioId = msg.text.split(' ')[1];
            if (newChatSecundarioId) {
                if (!config.chatsSecundarios.includes(newChatSecundarioId)) {
                    config.chatsSecundarios.push(newChatSecundarioId);
                    saveConfig(config);
                    bot.sendMessage(msg.chat.id, `Chat secundário adicionado: ${newChatSecundarioId}`);
                } else {
                    bot.sendMessage(msg.chat.id, 'Este chat secundário já está na lista.');
                }
            } else {
                bot.sendMessage(msg.chat.id, 'Por favor, forneça um ID de chat válido.');
            }
        }
    }
}

module.exports = { handleAdminCommands };
