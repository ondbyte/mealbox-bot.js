import redis from "redis";
const util = require('util') 
import {promisify} from "util"

let cache:redis.RedisClient
let db:redis.RedisClient
let _getValue:(arg1:string)=>Promise<string|null>
let _setValue:(arg1:string,arg2:string)=>Promise<string|null>
let _getDBValue:(arg1:string)=>Promise<string|null>
let _setDBValue:(arg1:string,arg2:string)=>Promise<string|null>

async function connect(host: string, port: number, password: string|undefined,onConnected:(r:redis.RedisClient)=>any ): Promise<boolean>{
    return new Promise((res, rej) => {
        console.log("connecting to redis instance")
        console.log(host+":"+port)
        var c = redis.createClient({ host: host, port: port, password: password })
        c.once("error",(err)=>{
            console.error(err)
            console.log("failed to establish connection to redis")
            res(false)
        })
        c.once("connect",()=>{
            console.log("redis connection is active")
            onConnected(c)
            res(true)
        })
        //to-do implement reconnecting
    })
}

async function connectToCache(host:string,port:number,password:string|undefined):Promise<boolean> {
    return connect(host,port,password,(r:redis.RedisClient)=>{
        cache=r
    })
}

async function connectToDB(host:string,port:number,password:string|undefined):Promise<boolean> {
    return connect(host,port,password,(r:redis.RedisClient)=>{
        db=r
    })
}

///promisified data getters and setters for the redis instances
function setupGetterSetter() {
    _getValue = promisify<string,string|null>(cache.get).bind(cache)
    _setValue = promisify<string,string,string|null>(cache.set).bind(cache)
    _getDBValue = promisify<string,string|null>(cache.get).bind(cache)
    _setDBValue = promisify<string,string,string|null>(cache.set).bind(cache)
    console.log("user cache and DB is accessible now")
}

///expose utility functions
async function getValue(key:string) {
    return _getValue(key)
}
async function setValue(key:string,value:string) {
    return _setValue(key,value)
}
async function getDBValue(key:string) {
    return _getValue(key)
}
async function setDBValue(key:string,value:string) {
    return _setValue(key,value)
}

function cacheActive():boolean{
    return cache?cache.connected:false
}

function dbActive():boolean{
    return db?db.connected:false
}

export const redisio ={
    cacheActive,
    dbActive,
    connectToCache,
    connectToDB,
    setupGetterSetter,
    getValue,
    setValue,
    getDBValue,
    setDBValue,
    getUser: getValue,
    setUser: setValue,
    getDBUser: getDBValue,
    setDBUser: setDBValue,
}

