require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    await member.send(
      `¡Hola ${member.user.username}! 👋\n\nPara mejorar tu experiencia en nuestro servidor de Minecraft, instala el texture pack oficial: [LINK_DEL_TEXTURE_PACK] 🎨`
    );
  } catch (error) {
    console.error(`Error al enviar mensaje a ${member.user.tag}:`, error);
  }
});

client.login(process.env.TOKEN);
