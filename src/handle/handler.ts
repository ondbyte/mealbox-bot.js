import {ask,regExp} from "../config"

async function register( expectReply:(reply:string)=>Promise<string>){
    var name = await expectReply(ask.name)
    var address:string[] = parseAddress(await expectReply(ask.addrress))
    if(){
        
    }
}

export function parseAddress(s:string):Array<string>{
    var matchs = s.match(regExp.pin)
    if(matchs){
        return [s.replace(regExp.pin,""),matchs[0]]
    }
    return[s]
}

