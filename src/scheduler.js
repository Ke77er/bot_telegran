const moment = require('moment-timezone');
const { saveConfig } = require('./config');
const { encaminharMensagensAgendadas } = require('./messageHandler');

let nextScheduledMessageID = 1;

// Inicializa o agendador de mensagens
function initializeScheduler(bot, config) {
    config.mensagensAgendadas.forEach((scheduledMessage) => {
        const currentDateTime = moment();
        const scheduledDateTime = moment(scheduledMessage.scheduleTime);

        if (scheduledDateTime.isAfter(currentDateTime)) {
            const delayMilliseconds = scheduledDateTime.diff(currentDateTime);
            setTimeout(() => {
                encaminharMensagensAgendadas(bot, config);
                config.mensagensAgendadas = config.mensagensAgendadas.filter((item) =>
                    moment().isBefore(moment(item.scheduleTime))
                );
                saveConfig(config);
            }, delayMilliseconds);
        }
    });
}

// Função para agendar uma mensagem
function agendarMensagem(bot, msg, config) {
    if (msg.text.startsWith('/agendar')) {
        const chatId = msg.chat.id;
        const match = msg.text.match(/\/agendar (.+)/);
        if (match && match[1]) {
            const scheduleData = match[1].split(' ');
            if (scheduleData.length >= 3) {
                const date = scheduleData[0];
                const time = scheduleData[1];
                const messageType = scheduleData[2];
                const message = scheduleData.slice(3).join(' ');

                const scheduleTime = `${date} ${time}`;
                const currentDateTime = moment();
                const scheduledDateTime = moment(scheduleTime, 'DD/MM/YYYY HH:mm:ss');

                if (scheduledDateTime.isAfter(currentDateTime)) {
                    const delayMilliseconds = scheduledDateTime.diff(currentDateTime);

                    const scheduledMessage = {
                        id: nextScheduledMessageID,
                        scheduleTime: scheduledDateTime.format(),
                        message,
                        chatId,
                        messageType,
                    };
                    nextScheduledMessageID++;

                    config.mensagensAgendadas.push(scheduledMessage);
                    saveConfig(config);

                    setTimeout(() => {
                        encaminharMensagensAgendadas(bot, config);
                        config.mensagensAgendadas = config.mensagensAgendadas.filter((item) =>
                            moment().isBefore(moment(item.scheduleTime))
                        );
                        saveConfig(config);
                    }, delayMilliseconds);

                    bot.sendMessage(chatId, `Mensagem agendada para: ${scheduleTime}`);
                } else {
                    bot.sendMessage(chatId, 'O horário de agendamento deve ser no futuro.');
                }
            } else {
                bot.sendMessage(chatId, 'Formato incorreto. Use: /agendar DD/MM/AAAA HH:MM:SS /msg <texto> ou /img <URL> ou /video <URL>');
            }
        }
    }
}

module.exports = { initializeScheduler, agendarMensagem };
