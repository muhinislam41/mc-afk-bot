const bedrock = require('bedrock-protocol');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('AFK Bot is running 24/7!');
});

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

function createBot() {
  console.log('Connecting AFK Bot to 65.21.82.29:42060...');

  const client = bedrock.createClient({
    host: '65.21.82.29',
    port: 42060,
    username: 'AFK_Bot',
    offline: true,
    version: '1.26.51',
    skipPing: true,
    raknetTimeout: 30000
  });

  client.on('join', () => {
    console.log('>>> Bot successfully joined the server! <<<');
  });

  client.on('disconnect', (packet) => {
    console.log('Bot disconnected:', packet);
    setTimeout(createBot, 10000);
  });

  client.on('error', (err) => {
    console.log('Connection Error:', err.message);
    setTimeout(createBot, 10000);
  });
}

createBot();
