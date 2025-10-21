// <========> IMPORT MODULE <========>
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

// <========> GLOBAL <========>
global.bot = {
   prefix: ".",
   autoTyping: true,
   autoRead: true,
   namaBot: "base",
   idch: "938373763637379282@newsletter"
}

global.owner = {
   name: "", // ubah aja
   number: "" // ubah aja
}

global.db = {
   premium: JSON.parse(fs.readFileSync(path.join(__dirName, "../config/database/premium.json")))
}

global.thumb = {
   image: "https://files.catbox.moe/iv75zz.png"
}