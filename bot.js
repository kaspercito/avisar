require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once("ready", async () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  const userId = "696592229166350347"; // Reemplaza con la ID del usuario que recibirá el mensaje

  // Obtener la hora actual en Uruguay (GMT-3)
  const now = new Date();
  const nowUtc = now.getTime() + now.getTimezoneOffset() * 60000; // Convertir a UTC
  const uruguayTime = new Date(nowUtc + -3 * 3600000); // Ajustar a GMT-3

  // Configurar la hora de envío (10:30 AM)
  const sendTime = new Date(uruguayTime);
  sendTime.setHours(10, 30, 0, 0); // 10:30 AM exacto

  // Si ya pasó la hora de hoy, programarlo para mañana
  if (uruguayTime > sendTime) {
    sendTime.setDate(sendTime.getDate() + 1);
  }

  // Calcular tiempo restante en milisegundos
  const timeUntilSend = sendTime - uruguayTime;
  console.log(`El mensaje se enviará a las 10:30 AM (Uruguay). Falta: ${(timeUntilSend / 60000).toFixed(2)} minutos`);

  setTimeout(async () => {
    try {
      const user = await client.users.fetch(userId);
      if (user) {
        await user.send(
          `¡Hola! 👋\n\nPlanta, POR FAVOR recuerda instalar el texture pack: [https://discord.com/channels/@me/1046189182181179483/1340175960552505394] 🎨`
        );
        console.log(`Mensaje enviado a ${user.tag}`);
      } else {
        console.log("No se encontró al usuario.");
      }
    } catch (error) {
      console.error(`Error al enviar mensaje:`, error);
    }
  }, timeUntilSend); // Espera hasta la hora exacta
});

client.login(process.env.TOKEN);
