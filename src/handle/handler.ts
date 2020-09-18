import { ask, tell, regExp } from "../config"

async function register(expectReply: (reply: string) => Promise<string>, inform: (info: string) => Promise<void>) {
    var reply = ""
    var name = ""
    var address:Address = {address:"",pin:""}
    var pin = ""
    ///ask name
    do {
        reply = await expectReply(ask.name)
        name = reply
        await inform(tell.nameAcknowledeged(name))
        reply = await expectReply(ask.confirmation)
    } while (!isAcknowledge(reply))

    ///ask address
    do {
        reply = await expectReply(ask.addrress)
        address = parseAddress(reply)
        if(address.pin.length==6)
        reply = await expectReply(ask.confirmation)
    } while (!isAcknowledge(reply))

    reply = await expectReply(ask.addrress)
    var tmp = parseAddress(reply)
    var address = ""
    var pin = ""
    if (tmp.length == 2) {
        address = tmp[0]
        pin = tmp[1]
    } else {
        address = tmp[0]
    }

}

export function isAcknowledge(s: string) {
    if (s.localeCompare("") == 0) {
        return false
    }
    var options = ["ok", "okay", "sure", "yes"]
    if (options.some(e => s.localeCompare(e) >= 0)) {
        return true
    }
    return false
}

export function parseAddress(s: string): Address {
    var matchs = s.match(regExp.pin)
    if (matchs) {
        return {address:s.replace(regExp.pin,"").trim(),pin:matchs[0]}
    }
    return {address:s.replace(regExp.pin,""),pin:""}
}

