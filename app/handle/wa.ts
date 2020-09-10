import * as fs from "fs"
import {
    WAConnection,
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    MessageLogLevel,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
} from "@adiwajshing/baileys"

async function start(onQr:(qr:string)=>void,onReady:()=>void) {
    const SESSION_FILE_PATH = "./session.json"
    const conn = new WAConnection()
    ///load session
    let sesCfg
    fs.existsSync(SESSION_FILE_PATH) && conn.loadAuthInfo(SESSION_FILE_PATH)

    conn.connectOptions.timeoutMs = 60*1000
    conn.connectOptions.maxRetries = 5

    await conn.connect()
    //write session
    const authInfo = conn.base64EncodedAuthInfo()
    fs.writeFileSync(SESSION_FILE_PATH,JSON.stringify(authInfo,null,"\t"))

    
}

