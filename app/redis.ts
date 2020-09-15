
import * as pm from "child_process"
var prc:pm.ChildProcess;

async function startRedis(path:string): Promise<boolean> {
    return new Promise((resolve) => {
        console.log('starting redis')
        var rp = pm.spawn(path)
        rp.stdout.setEncoding("utf-8")
        rp.stdout.once("data", (data) => {
            prc= rp
            console.log('redis started')
            resolve(true)
        })
        rp.stderr.once("data", (data) => {
            console.log(data)
            console.log('redis failed to start')
            resolve(false)
        })
        
    })
}

function active():boolean{
    return prc?!prc.killed:false
}

async function stopRedis(): Promise<boolean> {
    return new Promise(
        (resolve)=>{
            if(prc){
                console.log("trying to stop redis")
                resolve(prc.kill("SIGTERM"))
            } else {
                console.log("found no redis instance to stop")
                resolve(true)
            }
        }
    )
}


export const redis = {
    startRedis,
    stopRedis,
    active
}


