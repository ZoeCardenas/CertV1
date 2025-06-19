// watcher.js
require('dotenv').config(); // Cargar variables del .env

const { getUserInput, confirmLoadPreviousConfig } = require('./utils/inputHandler');
const { saveConfig, loadConfig } = require('./utils/configManager');
const { startCertStreamWatcher } = require('./certstream');

(async () => {
  console.clear();
  console.log("🔍 Watcher OSINT CLI\n");

  let config;
  const useSaved = await confirmLoadPreviousConfig();

  if (useSaved) {
    config = loadConfig();
    if (!config) {
      console.log("❌ No se encontró configuración previa. Ingresando nueva...");
      config = await getUserInput();
      saveConfig(config);
    } else {
      console.log("✅ Configuración cargada desde archivo.");
    }
  } else {
    config = await getUserInput();
    saveConfig(config);
  }

  console.log("\n📡 Escuchando dominios en CertStream...\n");
  startCertStreamWatcher(config);
})();
