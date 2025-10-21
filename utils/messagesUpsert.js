// <========> IMPORT MODULE <========>
import { isJidGroup, isJidUser, getContentType } from "@itsukichan/baileys";
import "../config/setting.js"
import cases from "../cases.js"


// <========> MESSAGES FUNC <========>
export default async function messagesUpsert(bot, m) {
    if (!m.message) return;
    m.chat = m.key.remoteJid;
    m.Group = isJidGroup(m.chat);
    m.isPrivate = isJidUser(m.chat);
    m.isNewsletter = m.chat.endsWith("@newsletter");
    m.isStory = m.chat.endsWith("status@broadcast");
    m.senderId = m.isNewsletter
        ? ""
        : m.Group || m.isStory
        ? m.key.participantAlt || "No Jid"
        : m.key.remoteJid;
   m.botNumber = await bot.decodeJid(bot.user.id);
   m.isOwner = global.owner.number
    m.type = getContentType(m.message);
    m.body =
        m.type === "conversation"
            ? m.message.conversation
            : m.message[m.type].text ||
              m.message[m.type].singleSelectReply?.selectedRowId ||
              m.message[m.type].selectedButtonId ||
              (m.message[m.type].nativeFlowResponseMessage?.paramsJson
                  ? JSON.parse(
                        m.message[m.type].nativeFlowResponseMessage.paramsJson
                    ).id
                  : "") ||
              "";
      m.isCmd = m.body.trim().startsWith(global.bot.prefix)
      m.cmd = m.body.replace(global.bot.prefix, "").trim().split(/ +/).shift().toLowerCase()
      const args = m.body.split(/ +/).slice(1)
      const text = args.join(" ")
      if (global.bot.autoTyping) {
      if (m.cmd) {
        bot.sendPresenceUpdate('composing', m.chat)
      }
      if (global.bot.autoRead) {
      bot.readMessages([m.key])
    }
      return cases(bot, m)
}
