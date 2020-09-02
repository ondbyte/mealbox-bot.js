import { config } from "./config"
import * as pm from "child_process"

var redisProcess: pm.ChildProcess;
async function startRedis(): Promise<boolean> {
    return new Promise((resolve, reject) => {

        redisProcess = pm.spawn(config.redisPath)
        redisProcess.stdout?.on("data", (data) => {
            console.log(data)
        })
    })
}

async function stopRedis(): Promise<boolean> {
    redisProcess?.kill("SIGTERM")
    return redisProcess.killed;
}

module.exports = {
    startRedis,
    stopRedis
}

