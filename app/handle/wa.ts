import fs from "fs"
import {Client, Location} from "whatsapp-web.js"

const SESSION_FILE_PATH = "./session.json"
///load session
let sesCfg
if(fs.existsSync(SESSION_FILE_PATH)){
    sesCfg = require(SESSION_FILE_PATH)
}

const window = new Client({puppeteer:{headless:false},session:sesCfg})

///initialize wa web
window.initialize();
///listen for events from wa
window.on("qr",(qr)=>{
    
})

