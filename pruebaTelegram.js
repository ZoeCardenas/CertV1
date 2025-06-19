// prueba.js
require('dotenv').config();
const { sendTelegramAlert } = require('./telegram');

async function testTelegram() {
  const testMessage = "✅ *Prueba exitosa de conexión con Telegram*\\nEste mensaje fue enviado desde `prueba.js`.";

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.error("❌ Falta TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en el archivo .env");
    return;
  }

  try {
    await sendTelegramAlert(process.env.TELEGRAM_BOT_TOKEN, process.env.TELEGRAM_CHAT_ID, testMessage);
    console.log("📨 Mensaje de prueba enviado correctamente por Telegram.");
  } catch (err) {
    console.error("❌ Error al enviar mensaje:", err.message);
  }
}

testTelegram();
