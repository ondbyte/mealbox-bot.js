import { business } from "../../config"
import { keys } from "../misc/keywords"

export const ask = {
    name: "Please tell us your full name",
    addrress: "Please send us your address in one message",
    pin: "Please send us your PIN-code",
    location: "Send us your location for easier delivery",
    confirmation: "Okay?"
    //number:"send other numbers (separated by a space) who wish to order from us, for every first order they place you'll receive ₹50 credit to order from us"
}

export const say = {
    whenKnocked:{
        greet:`Hi, Welcome to ${business.name}, send ${keys.register} to register with us`
    },
    whileRegistering: {
        ///registration part
        nameAcknowledeged: (name: string) => "We\'ve set your name as\n" + name,
        addressAcknowledged: (address: string) => "We\'ll use this address\n" + address,
        pinAcknowledged: (pin: string) => pin + " will be used as your pin",
        locationAcknowledged: () => "We will use that location",
        locationProblematic: (textToSend: string) => textToSend,

        offerPart1: (code: string) => `Order from ${business.name} today, too ` + business.kindWord + `\n` +
            `https://wa.me/${business.number}?text=${encodeURIComponent('Hello ' + business.name + ', I\'ve this coupon: ' + code)}`,

        offerPart2: () => `You have ₹50 off on your first order\n` +
            `and share the above message with your friends so that you'll recieve discounts when they place their first order`,

        registrationComplete: (name: string) => `Welcome ${name}Thank you for registering with us`,
        //numberAcknowledged:(nums:Array<string>)=>"We\'ve stored these numbers for update\n"+nums.join("\n")
    }
}
