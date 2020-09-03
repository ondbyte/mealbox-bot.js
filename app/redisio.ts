import redis from "redis";
const util = require('util') 

var client:redis.RedisClient
async function connect(host: string, port: number, password: string): Promise<boolean>{
    return new Promise((res, rej) => {
        console.log("connecting to redis instance")
        var c = redis.createClient({ host: host, port: port, password: password })
        c.once("error",(err)=>{
            console.error(err)
            console.log("failed to establish connection to redis")
            res(false)
        })
        c.once("connect",()=>{
            console.log("redis connection is active")
            client = c
            res(true)
        })
        //to-do implement reconnecting
    })
}

function active():boolean{
    return client?client.connected:false
}

export const redisio ={
    connect,
    active
}

