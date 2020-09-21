import * as fs from "fs"
import { Type, Message, Conversation, Update } from "./classes/conversation"

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

///all the connected users
let users: Map<string, Conversation>

async function start(): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        const SESSION_FILE_PATH = "./session.json"
        const conn = new WAConnection()
        ///load session
        let sesCfg
        fs.existsSync(SESSION_FILE_PATH) && conn.loadAuthInfo(SESSION_FILE_PATH)

        conn.connectOptions.timeoutMs = 60 * 1000
        conn.connectOptions.maxRetries = 5

        await conn.connect()
        //write session
        const authInfo = conn.base64EncodedAuthInfo()
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(authInfo, null, "\t"))

        conn.on("open", (r) => {
            res(true)
        })

        conn.on("")

        async function send(message: Message) {

        }

        conn.on("message-new", async function (m) {
            let from = "xyz"
            let isUpdate = false

            ///get user object
            var user = users.get(from)
            if (user) {
                if (isUpdate) {
                    let message = {} as Message
                    user.onUpdate
                } else {
                    let update = {} as Update
                    user.onUpdate(update)
                }
            } else {
                if (!isUpdate) {
                    let message = {} as Message
                    let conversation = new Conversation(message, (m) => {
                        send(m)
                    })
                    users.set(from, conversation)
                }
            }
        })
    })
}

