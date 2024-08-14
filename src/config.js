const fs = require('fs');

const configFileName = 'config.json';

// Carrega as configurações
function loadConfig() {
    let config = {
        mensagensAgendadas: [],
    };

    if (fs.existsSync(configFileName)) {
        const configFile = fs.readFileSync(configFileName, 'utf8');
        config = JSON.parse(configFile);
    }

    return config;
}

// Salva as configurações
function saveConfig(config) {
    fs.writeFileSync(configFileName, JSON.stringify(config, null, 4));
}

module.exports = { loadConfig, saveConfig };
