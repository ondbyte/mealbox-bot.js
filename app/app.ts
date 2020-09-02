import {config} from "./config"
import {redis} from "./redis"
import * as pm from "child_process"

await redis.startRedis(config.redisPath)
if(!redis.active()){
    process.abort()
}

