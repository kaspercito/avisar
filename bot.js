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

  // Función para enviar el mensaje
  const enviarMensaje = async () => {
    try {
      const user = await client.users.fetch(userId);
      if (user) {
        await user.send(
          `¡Hola Planta! 👋\n\nRECUERDA INSTALAR EL TEXTURE PACK jiji, para que no te olvides te aviso cada 5 minutos: [https://discord.com/channels/@me/1046189182181179483/1340175960552505394] 🎨`
        );
        console.log(`Mensaje enviado a ${user.tag}`);
      } else {
        console.log("No se encontró al usuario.");
      }
    } catch (error) {
      console.error(`Error al enviar mensaje:`, error);
    }
  };

  // Llamar a la función de mensaje inmediatamente
  enviarMensaje();

  // Configurar el intervalo para enviar el mensaje cada 5 minutos (300,000 milisegundos)
  setInterval(enviarMensaje, 5 * 60 * 1000); // 5 minutos en milisegundos
});

client.login(process.env.TOKEN);
