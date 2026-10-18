const express = require('express');
const bedrock = require('bedrock-protocol');

// Render-এর সার্ভিস অ্যাক্টিভ রাখার জন্য ওয়েবাসার্ভার
const app = express();
const PORT_WEB = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Minecraft AFK Bot is running 24/7 on Render!');
});

app.listen(PORT_WEB, () => {
  console.log(`Web server running on port ${PORT_WEB}`);
});

// মাইনক্রাফট বেডরক বট সেটিংস
const HOST = 'Mulaali.enderman.cloud';
const PORT = 42060;
const USERNAME = 'AFK_Bot_247'; 

function connectBot() {
    console.log(`Connecting AFK Bot to ${HOST}:${PORT}...`);

    const client = bedrock.createClient({
        host: HOST,
        port: PORT,
        username: USERNAME,
        offline: true,
        skipPing: true // এই অপশনটি Ping এরর বাইপাস করবে
    });

    client.on('join', () => {
        console.log('Bot successfully joined the server!');
    });

    client.on('disconnect', (packet) => {
        console.log('Bot disconnected:', packet.reason);
        console.log('Reconnecting in 15 seconds...');
        setTimeout(connectBot, 15000);
    });

    client.on('error', (err) => {
        console.log('Error:', err.message);
    });
}

connectBot();
