// utils/configManager.js
const fs = require('fs');
const path = './config.json';

function saveConfig(config) {
  try {
    fs.writeFileSync(path, JSON.stringify(config, null, 2));
    console.log("💾 Configuración guardada correctamente.");
  } catch (error) {
    console.error("❌ Error al guardar la configuración:", error.message);
  }
}

function loadConfig() {
  try {
    if (!fs.existsSync(path)) return null;
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error al cargar configuración previa:", error.message);
    return null;
  }
}

module.exports = {
  saveConfig,
  loadConfig
};
