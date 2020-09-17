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
        console.log("unable to connect to cache")
        stop()
        return false
    }

    ///connect to redis server which acts as our DB
    await redisio.connectToDB(config.redisHost,config.redisPort,config.redisPassword)
    if(!redisio.dbActive){
        console.log("unable to connect to db")
        stop()
        return false
    }
    ///setup async setters and getters for redis
    redisio.setupGetterSetter()
    
    return true
}

async function stop():Promise<void> {
    var b = await redis.stopRedis()
    if(!b) console.log("unable stop redis, please kill it if it exists, before starting the program again")
}

///start the program
export const app = {
    start,
    stop
}

