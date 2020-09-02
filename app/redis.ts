
import * as pm from "child_process"
var prc:pm.ChildProcess;

async function startRedis(path:string): Promise<boolean> {
    return new Promise((resolve) => {
        console.log('starting redis')
        var rp = pm.spawn(path)
        rp.stdout.on("data", (data) => {
            console.log(data)
            console.log('redis fired up')
            prc= rp
            resolve(true)
        })
        rp.stderr.on("data", (data) => {
            console.log(data)
            console.log('redis failed to start')
            resolve(false)
        })
    })
}

function active():boolean{
    return prc?prc.killed:false
}

async function stopRedis(): Promise<boolean> {
    return new Promise(
        (resolve)=>{
            if(prc){
                resolve(prc.kill("SIGTERM"))
            } else {
                resolve(false)
            }
        }
    )
}


export const redis = {
    startRedis,
    stopRedis,
    active
}


