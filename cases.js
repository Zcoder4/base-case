// <========> IMPORT MODULE <========>
import { downloadContentFromMessage } from "@itsukichan/baileys";
import "./config/setting.js";

// <========> CASES MODULE <========>
export default async function cases(bot, m) {
   const reply = teks => {
    bot.sendMessage(
        m.chat,
        {
            text: teks,
            contextInfo: {
                mentionedJid: [m.senderId],
                isForwarded: true,
                externalAdReply: {
                    title: global.bot.namaBot,
                    thumbnailUrl: global.thumb.image,
                    renderLargerThumbnail: false,
                    mediaType: 0,
                    previewType: 0
                }
            }
        },
        { quoted: m }
    );
};
    console.log(m);
    switch (m.cmd) {
   case 'autotyping':{
if (!m.isOwner) return reply("khusus owner")
if (args.length < 1) return reply(`.autotyping on/off`)
if (q === 'on') {
global.bot.autoTyping = true
reply(`Berhasil mengubah autoread ke ${q}`)
} else if (q === 'off') {
global.bot.autoTypinh = false
reply(`Berhasil mengubah autoread ke ${q}`)
}
break
    case 'autoread': {
if (!m.isOwner) return reply("khusus owner")
if (!args[0]) return m.reply(`*.autoread off/on*`)
if (args[0] === 'on') {
global.bot.autoRead = true
await reply('Sukses mengaktifkan autoread.')
} else if (args[0] === 'off') {
global.bot.autoReqd = false
await reply('Sukses menonaktifkan autoread.')
}}
break
    }
}
