import { MessageOptions } from "@adiwajshing/baileys"

export enum Type {
    text,
    image,
    video,
    location
}

export interface Message {
    type: Type,
    text: string,
    image: Uint8Array,
    video: undefined
}

export interface Update {

}

export interface UserInfo {
    user: string;
    name: string;
    address: string;
    pin: string;
    asked: string;
    location: Location;
  }
  
 export interface Location {
    lat: string;
    lon: string;
  }



export class Conversation {
    send: (message: Message) => void
    private resolveReply?: (reply: Message) => void
    private rejectReply?: () => void
    private info:UserInfo

    constructor(firstMessage: Message, sender: (message: Message) => void) {
        this.send = sender
    }
    
    async onUpdate(update: any) {

    }

    async onReply(message: Message) {
        if (this.resolveReply != undefined) {
            this.resolveReply(message)
            this.resolveReply = undefined
        }
    }

    async expectReply(message: Message): Promise<Message> {
        return new Promise<Message>((res, rej) => {
            ///the message we send and wait for the reply
            this.send(message)
            this.resolveReply = res
            this.rejectReply = rej
        })
    }
}