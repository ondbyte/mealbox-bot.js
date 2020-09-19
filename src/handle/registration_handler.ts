import { ask, say as say } from "./misc/conversation"
import {isAcknowledge} from "./misc/helpers"
import { Address } from "./classes/address"

export async function register(expectReply: (reply: string) => Promise<string>, inform: (info: string) => Promise<void>) {
    var reply = ""
    var name = ""
    var address: Address
    
    ///ask name
    do {
        reply = await expectReply(ask.name)
        name = reply
        await inform(say.whileRegistering.nameAcknowledeged(name))
        reply = await expectReply(ask.confirmation)
    } while (!isAcknowledge(reply))

    ///ask address
    do {
        reply = await expectReply(ask.addrress)
        address = new Address(reply)
        if (!address.hasPin) {
            do {
                reply = await expectReply(ask.pin)
            } while (!address.setPin(reply))
        }
        await inform(say.whileRegistering.addressAcknowledged(address.address as string))
        await inform(say.whileRegistering.pinAcknowledged(address.pin as string))
        reply = await expectReply(ask.confirmation)
    } while (!isAcknowledge(reply))

    ///ask location
    var locationSet = false
    do{
        reply = await expectReply(ask.location)
        locationSet = address.setLocation(reply)
        if(!locationSet){
            await inform(say.whileRegistering.locationProblematic("that location is very far from your address"))
        }
    } while (!locationSet)

    await inform(say.whileRegistering.registrationComplete(name))
    await inform(say.whileRegistering.offerPart1("XYZ-XYZ"))
    await inform(say.whileRegistering.offerPart2())
}

