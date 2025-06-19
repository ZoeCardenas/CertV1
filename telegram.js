// telegram.js
const axios = require('axios');

async function sendTelegramAlert(token, chatId, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log("📨 Alerta enviada por Telegram.");
  } catch (error) {
    console.error("❌ Error al enviar mensaje a Telegram:", error.message);
  }
}

module.exports = {
  sendTelegramAlert
};
