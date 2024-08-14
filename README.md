# Telegram Bot de Encaminhamento

Este é um bot do Telegram que encaminha mensagens, imagens e vídeos de um chat principal para chats secundários específicos. Ele também permite o agendamento de mensagens.

## Funcionalidades

- Configurar o token do bot
- Definir o chat principal
- Adicionar chats secundários
- Listar configurações atuais
- Encaminhar mensagens de texto, imagens e vídeos
- Agendar mensagens para serem encaminhadas em horários específicos

## Requisitos

- [Node.js](https://nodejs.org/)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [moment-timezone](https://momentjs.com/timezone/)

## Instalação

1. Clone o repositório:
   ```shell
   git clone https://github.com/Ke77er/bot_telegram.git
   ```

2. Acesse o diretório do projeto:
   ```shell
   cd bot_telegram
   ```

3. Instale as dependências:
   ```shell
   npm install
   ```

4. Configure o arquivo `.env` com o token do seu bot e IDs de chat:
   ```env
   API_TOKEN=SEU_TOKEN
   CHAT_PRINCIPAL=ID_DO_CHAT_PRINCIPAL
   CHAT_SECUNDARIO_1=ID_DO_CHAT_SECUNDARIO_1
   CHAT_SECUNDARIO_2=ID_DO_CHAT_SECUNDARIO_2
   CHAT_SECUNDARIO_3=ID_DO_CHAT_SECUNDARIO_3
   ```

5. Execute o bot:
   ```shell
   node bot.js
   ```

## Estrutura do Projeto

- `bot.js`: Arquivo principal que inicializa o bot.
- `config.js`: Gerenciamento de configuração.
- `scheduler.js`: Lógica de agendamento de mensagens.
- `messageHandler.js`: Lógica de manipulação de mensagens.
- `adminCommands.js`: Comandos administrativos.
- `utils.js`: Funções utilitárias.
- `config.json`: Arquivo de configuração com as mensagens agendadas e IDs dos chats.
- `node_modules/`: Diretório com as dependências do Node.js.

## Funções Principais

- **isChatPrincipalAdmin(msg)**: Verifica se o remetente da mensagem é um administrador no chat principal.
- **encaminharMensagemParaSecundarios(msg)**: Encaminha texto, imagens ou vídeos do chat principal para os chats secundários.
- **agendarMensagem(msg)**: Agenda uma mensagem para ser encaminhada para chats secundários em um horário especificado. O formato da mensagem é `/agendar DD/MM/AAAA HH:MM:SS /msg <texto> ou /img <URL> ou /video <URL>`.
- **encaminharMensagensAgendadas()**: Encaminha mensagens agendadas para chats secundários e remove-as da lista de mensagens agendadas.
- **initializeScheduler()**: Inicializa o agendador de mensagens, configurando os timeouts para encaminhar as mensagens agendadas.

## Comandos

- `/help`: Exibe uma lista de comandos disponíveis.
- `/setchatprincipal ID_DO_CHAT`: Configurar o chat principal.
- `/addchatsecundario ID_DO_CHAT`: Adicionar um chat secundário.
- `/listconfig`: Listar as configurações atuais.
- `/agendar DD/MM/AAAA HH:MM:SS /msg <texto> ou /img <URL> ou /video <URL>`: Agenda uma mensagem para ser enviada no horário especificado.

## Ouvintes de Eventos

- O bot ouve mensagens enviadas ao chat principal e as trata adequadamente, encaminhando-as para os chats secundários quando aplicável.
- Ele também ouve erros durante a pesquisa (polling) e os registra.

## Uso

- Inicie o bot enviando o comando `/start` em um chat privado com o bot.
- Configure o bot definindo o token do bot, o ID do chat principal e adicionando IDs de chats secundários usando os comandos relevantes.
- Envie mensagens, imagens ou vídeos no chat principal para que sejam encaminhados para os chats secundários.
- Agende mensagens usando o comando `/agendar` com a data e a hora desejadas.

## Solução de Problemas

- Se o bot encontrar problemas ou erros, eles serão registrados no console.
- Certifique-se de que o bot tenha as permissões necessárias nos chats principal e secundários para enviar mensagens e mídia.
- Verifique se o formato de data e hora para mensagens agendadas está correto.

## Autor

Jonatan Keller

## Licença

Este código é fornecido sob uma licença de código aberto. Você está livre para usá-lo e modificá-lo conforme necessário. Consulte o arquivo LICENSE para obter mais detalhes.