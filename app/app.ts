import { config } from "./config"
import { redis } from "./redis"
import {redisio} from "./redisio"

async function main() {
    ///start the redis server
    await redis.startRedis(config.redisServerPath)
    if (!redis.active()) {
        console.log("exiting as redis not available")
        process.abort()
    }
    ///connect to cache which is a local redis server
    await redisio.connectToCache(config.redisHost,config.redisPort,config.redisPassword)
    if(!redisio.cacheActive){
        console.log("exiting as unable to connect to redis")
        var closed = await redis.stopRedis()
        if(!closed){
            console.log("unable to close redis, please manually close the process if exists")
        }
        process.abort()
    }
    ///connect to redis server which acts as our DB
    await redisio.connectToDB(config.redisHost,config.redisPort,config.redisPassword)
    if(!redisio.cacheActive){
        console.log("exiting as unable to connect to redis")
        var closed = await redis.stopRedis()
        if(!closed){
            console.log("unable to close redis, please manually close the process if exists")
        }
        process.abort()
    }
    ///setup async setters and getters for redis
    redisio.setupGetterSetter()
    
    
}
///listen for ctrl+c to finish the process
process.once("SIGINT",async()=>{
    await redis.stopRedis()
    console.log("exiting wab")
    process.exit()
})

///start the program
main()

