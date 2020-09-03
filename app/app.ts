import { config } from "./config"
import { redis } from "./redis"
import {redisio} from "./redisio"

async function main() {
    await redis.startRedis(config.redisServerPath)
    if (!redis.active()) {
        console.log("exiting as redis not available")
        process.abort()
    }
    await redisio.connect(config.redisHost,config.redisPort,config.redisPassword) 
    if(!redisio.active){
        console.log("exiting as unable to connect to redis")
        var closed = await redis.stopRedis()
        if(!closed){
            console.log("unable to close redis, please manually close the process if exists")
        }
        process.exit()
    }
    
}
process.once("SIGINT",async()=>{
    await redis.stopRedis()
    console.log("exiting wab")
    process.exit()
})
main()

