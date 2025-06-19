// utils/inputHandler.js
const fs = require('fs');
require('dotenv').config();

const configPath = './config.json';

async function getUserInput() {
  const inquirer = (await import('inquirer')).default;

  console.clear();
  console.log("🧠 Configuración Interactiva del Watcher OSINT CLI\n");

  const questions = [
    {
      type: 'input',
      name: 'organization',
      message: '🏢 Nombre de la organización:'
    },
    {
      type: 'input',
      name: 'domains',
      message: '🌐 Dominios a monitorear (separados por coma):',
      filter: input => input.split(',').map(d => d.trim().toLowerCase())
    },
    {
      type: 'input',
      name: 'keywords',
      message: '🔑 Palabras clave (separadas por coma):',
      filter: input => input.split(',').map(k => k.trim().toLowerCase())
    }
  ];

  const answers = await inquirer.prompt(questions);

  return {
    organization: answers.organization,
    domains: answers.domains,
    keywords: answers.keywords,
    telegram: {
      token: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID
    }
  };
}

async function confirmLoadPreviousConfig() {
  const inquirer = (await import('inquirer')).default;

  if (!fs.existsSync(configPath)) return false;

  const { useSaved } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useSaved',
      message: '¿Usar configuración guardada anterior?',
      default: false
    }
  ]);

  return useSaved;
}

module.exports = {
  getUserInput,
  confirmLoadPreviousConfig
};
