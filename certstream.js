// certstream.js
const WebSocket = require('ws');
const fs = require('fs');
const { sendTelegramAlert } = require('./telegram');

const CERTSTREAM_URL = 'wss://certstream.calidog.io/';
const LOG_FILE = 'alerts.log';

function startCertStreamWatcher(config) {
  const ws = new WebSocket(CERTSTREAM_URL);

  ws.on('open', () => {
    console.log("✅ Conectado a CertStream.\n");
  });

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      if (message.message_type !== 'certificate_update') return;

      const allDomains = message.data.leaf_cert.all_domains || [];

      allDomains.forEach(domain => {
        const domainLower = domain.toLowerCase();

        const matchesDomain = config.domains.some(d => domainLower.includes(d));
        const matchesKeyword = config.keywords.some(k => domainLower.includes(k));

        if (matchesDomain || matchesKeyword) {
          const alertMsg = `🚨 Coincidencia detectada\n🔹 Dominio: ${domain}\n🏢 Organización: ${config.organization}`;
          console.log(alertMsg);
          sendTelegramAlert(config.telegram.token, config.telegram.chatId, alertMsg);
          logAlert(domain, config.organization);
        }
      });

    } catch (err) {
      console.error("❌ Error procesando mensaje:", err.message);
    }
  });

  ws.on('error', (err) => {
    console.error("❌ Error en la conexión con CertStream:", err.message);
  });
}

function logAlert(domain, organization) {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ORG: ${organization} | DOM: ${domain}\n`;
  fs.appendFileSync(LOG_FILE, log);
}

module.exports = {
  startCertStreamWatcher
};
