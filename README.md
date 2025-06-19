
# 🕵️ Watcher CLI v1 – CertStream OSINT Alert System

`watcher-cli` es una herramienta de línea de comandos que monitorea certificados en tiempo real desde [CertStream](https://certstream.calidog.io/) y lanza alertas automáticas por Telegram cuando detecta coincidencias con dominios o palabras clave de interés.

---

## 🚀 Características

- 🔍 Monitoreo continuo de certificados TLS en tiempo real
- 🧠 Palabras clave y dominios personalizables desde la terminal
- 📨 Alertas automáticas por **Telegram**
- 💾 Configuración persistente vía `config.json`
- 📂 Compatible con `.env` para ocultar credenciales sensibles
- 🧰 CLI interactiva con `inquirer`
- 🛠️ Soporte para ejecución en segundo plano con `pm2`

---

## 📦 Requisitos

- Node.js `v18+`
- Cuenta en [Telegram](https://telegram.org) y un bot configurado
- Token y Chat ID del bot en tu archivo `.env`
- Opcional: `pm2` para ejecución persistente

---

## ⚙️ Instalación

```bash
git clone https://github.com/tuusuario/watcher-cli.git
cd watcher-cli
npm install
````

---

## 🧪 Configura tu archivo `.env`

Crea un archivo `.env` en la raíz con este contenido:

```env
TELEGRAM_BOT_TOKEN=TU_TOKEN_DEL_BOT
TELEGRAM_CHAT_ID=TU_CHAT_ID
```

---

## 🧭 Uso

### 👉 Modo interactivo:

```bash
npm start
```

* Puedes usar una configuración previa o ingresar una nueva.
* Se solicita:

  * Nombre de la organización
  * Lista de dominios (ej: `sigma.com, sigmafoods.mx`)
  * Lista de palabras clave (ej: `sigma, alimentos, webadmin`)

### 🪄 Ejemplo:

```bash
npm start

🔍 Watcher OSINT CLI

¿Usar configuración guardada anterior? (Y/n): n
🏢 Nombre de la organización: Sigma Alimentos
🌐 Dominios a monitorear: sigma.com, sigmafoods.mx
🔑 Palabras clave: sigma, alimentos, webadmin

📡 Escuchando dominios en CertStream...
```

---

## 📤 Prueba rápida de Telegram

Para verificar que tus credenciales funcionan:

```bash
node testTelegram.js
```

(archivo opcional que puedes crear para validar la conexión)

---

## 🔁 Mantener el bot corriendo (con pm2)

```bash
npm install -g pm2
pm2 start watcher.js --name watcher
pm2 save
```

Para recuperar tras reinicio:

```bash
pm2 resurrect
```

---

## 🗂 Estructura del proyecto

```
watcher-cli/
├── watcher.js              # Entrada principal
├── certstream.js           # Lógica de conexión y monitoreo
├── telegram.js             # Manejador de alertas por Telegram
├── configManager.js        # Carga y guarda configuración JSON
├── utils/
│   └── inputHandler.js     # CLI interactiva con inquirer
├── config.json             # Archivo de configuración generado
├── .env                    # (Ignorado por git) con tus credenciales
├── package.json
```

---

## 🧱 Créditos

Proyecto desarrollado para propósitos OSINT y educativos por el equipo de investigación de **Capa8**.

---

## ⚠️ Advertencia

Este proyecto no almacena información personal. Aun así, al usar palabras clave sensibles, asegúrate de cumplir con las leyes de privacidad y uso responsable de información pública.

