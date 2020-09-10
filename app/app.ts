import { config } from "./config"
import { redis } from "./redis"
import {redisio} from "./redisio"

async function start():Promise<boolean> {
    ///start the redis server
    await redis.startRedis(config.redisServerPath)
    if (!redis.active()) {
        console.log("exiting as redis not available")
        return false
    }

    ///connect to cache which is a local redis server
    await redisio.connectToCache(config.redisHost,config.redisPort,config.redisPassword)
    if(!redisio.cacheActive){
        console.log("exiting as unable to connect to redis")
        var closed = await redis.stopRedis()
        if(!closed){
            console.log("unable to close redis, please manually close the process if exists")
        }
        return false
    }

    ///connect to redis server which acts as our DB
    await redisio.connectToDB(config.redisHost,config.redisPort,config.redisPassword)
    if(!redisio.cacheActive){
        console.log("exiting as unable to connect to redis")
        var closed = await redis.stopRedis()
        if(!closed){
            console.log("unable to close redis, please manually close the process if exists")
        }
        return false
    }
    ///setup async setters and getters for redis
    redisio.setupGetterSetter()
    
    return true
}
///listen for ctrl+c to finish the process
process.once("SIGINT",async()=>{
    await redis.stopRedis()
    console.log("exiting wab")
    process.exit()
})

///start the program
export const app = {
    start
}

