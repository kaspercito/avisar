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

  setTimeout(async () => {
    try {
      const user = await client.users.fetch(userId);
      if (user) {
        await user.send(
          `¡Hola! 👋\n\nPlanta, recuerda instalar el texture pack: [https://discord.com/channels/@me/1046189182181179483/1340175960552505394] 🎨`
        );
        console.log(`Mensaje enviado a ${user.tag}`);
      } else {
        console.log("No se encontró al usuario.");
      }
    } catch (error) {
      console.error(`Error al enviar mensaje:`, error);
    }
  }, 10 * 60 * 1000); // 10 minutos en milisegundos
});

client.login(process.env.TOKEN);
