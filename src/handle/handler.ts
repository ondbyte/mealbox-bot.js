import { ask, tell, regExp } from "../config"
import {Address} from "../misc/address"

async function register(expectReply: (reply: string) => Promise<string>, inform: (info: string) => Promise<void>) {
    var reply = ""
    var name = ""
    var address:Address
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
        address = new Address(reply)
        if(!address.hasPin){
            do{
                reply = await expectReply(ask.pin)
            } while (address.setPin(reply))
        }
        reply = await expectReply(ask.confirmation)
    } while (!isAcknowledge(reply))


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

