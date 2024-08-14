const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { loadConfig, saveConfig } = require('./src/config');
const { handleMessage } = require('./src/messageHandler');
const { initializeScheduler } = require('./src/scheduler');
const { handleAdminCommands } = require('./src/adminCommands');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

let config = loadConfig();

// Verifique se as variáveis de ambiente essenciais foram definidas
if (!process.env.API_TOKEN || !process.env.CHAT_PRINCIPAL) {
    console.error('Erro: Token do bot e/ou ID do chat principal não configurados.');
    process.exit(1);
}

// Instância do bot
const bot = new TelegramBot(process.env.API_TOKEN, { polling: true });

// Configuração inicial do bot
if (!config.chatsSecundarios) {
    config.chatsSecundarios = [];
    saveConfig(config);
}

const chatsSecundarios = [
    process.env.CHAT_SECUNDARIO_1,
    process.env.CHAT_SECUNDARIO_2,
    process.env.CHAT_SECUNDARIO_3
];

// Certifique-se de que todos os chats secundários estão configurados corretamente
chatsSecundarios.forEach((chatID, index) => {
    if (!chatID) {
        console.error(`Erro: ID do chat secundário ${index + 1} não configurado.`);
        process.exit(1);
    } else {
        config.chatsSecundarios.push(chatID);
    }
});

// Salve a configuração atualizada
saveConfig(config);

// Inicialize o agendador de mensagens
initializeScheduler(bot, config);

// Configurar ouvintes de mensagens
bot.on('message', (msg) => handleMessage(bot, msg, config));
bot.on('message', (msg) => handleAdminCommands(bot, msg, config));
