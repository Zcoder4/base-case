// <========> IMPORT MODULE <========>
import {
   makeWASocket,
   useMultiFileAuthState,
   jidDecode
} from "@itsukichan/baileys"
import pino from "pino"
import readline from "readline"
import chalk from "chalk"
import path from "path"
import { fileURLToPath } from "url"
import messagesUpsert from "./utils/messagesUpsert.js"
import "./config/setting.js"


// <========> HANDLER <========>




// <========> QUESTION FUNC <========>
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = text => new Promise(resolve => rl.question(text, resolve));


// <========> BOT FUNC <========>
async function startConnect(){
   const { state, saveCreds } = await useMultiFileAuthState("session")
   const bot = makeWASocket({
      auth: state,
      logger: pino({ level: "silent" })
   })
   bot.ev.on("creds.update", saveCreds)
   if(!bot.authState.creds.registered){
      const phoneNumber = await question(chalk.blue.bold("masukkan nomor wa anda:"))
      const code = await bot.requestPairingCode(phoneNumber)
      console.log(chalk.yellow.bold(`kode mu adalah ${code}`))
   }
   bot.ev.on("connection.update", ({ connection }) => {
      if(connection === "close"){
         console.log(chalk.red.bold("mencoba memuat kembali"))
         startConnect()
      } else if(connection === "open"){
         console.log(chalk.green.bold("koneksi terhubung"))
      }
   })
   bot.ev.on("messages.upsert", ({ messages }) => {
      messagesUpsert(bot, messages[0])
   })
   bot.decodeJid = jid => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (
                (decode.user &&
                    decode.server &&
                    decode.user + "@" + decode.server) ||
                jid
            );
        } else return jid;
    }
}
startConnect()