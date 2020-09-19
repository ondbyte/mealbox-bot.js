import { say } from "./misc/conversation";

export async function knockKnock(expectReply: (reply: string) => Promise<string>, inform: (info: string) => Promise<void>){
    await inform(say.whenKnocked.greet)
}