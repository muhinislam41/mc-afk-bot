const bedrock = require('bedrock-protocol');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('AFK Bot is running!');
});

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

function createBot() {
  console.log('Connecting AFK Bot to Mulaali.enderman.cloud:42060...');

  const client = bedrock.createClient({
    host: 'Mulaali.enderman.cloud',
    port: 42060,
    username: 'AFK_Bot',
    offline: true,
    version: '1.26.52'
  });

  client.on('join', () => {
    console.log('Bot successfully joined the server!');
  });

  client.on('disconnect', (packet) => {
    console.log('Bot disconnected:', packet);
    setTimeout(createBot, 5000);
  });

  client.on('error', (err) => {
    console.log('Error:', err.message);
    setTimeout(createBot, 5000);
  });
}

createBot();
