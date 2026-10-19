const bedrock = require('bedrock-protocol');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('AFK Bot per Aternos è attivo 24/7!');
});

app.listen(port, () => {
  console.log(`Web server in esecuzione sulla porta ${port}`);
});

function createBot() {
  const host = process.env.SERVER_HOST || 'muhinii.aternos.me';
  const serverPort = parseInt(process.env.SERVER_PORT) || 41403;

  console.log(`Connessione del Bot AFK a ${host}:${serverPort}...`);

  const client = bedrock.createClient({
    host: host,
    port: serverPort,
    username: 'AFK_Bot',
    offline: true,
    version: '1.26.51',
    skipPing: true,
    raknetTimeout: 30000
  });

  client.on('join', () => {
    console.log('>>> Il Bot si è connesso con successo al server! <<<');
  });

  client.on('disconnect', (packet) => {
    console.log('Bot disconnesso:', packet);
    setTimeout(createBot, 10000);
  });

  client.on('error', (err) => {
    console.log('Errore di connessione:', err.message);
    setTimeout(createBot, 10000);
  });
}

createBot();
