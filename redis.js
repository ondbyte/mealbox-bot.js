const { lRedisPort, dRedisPort, lRedisHost, dRedisHost } = require("./cred");
const Redis = require("ioredis");
var spawn = require('child_process').spawn;


function startRedis() {
    var prc = spawn('./r607/src/redis-server');
    prc.stdout.setEncoding('utf8');
    prc.stdout.on(
        'data',
        (data) => {
            var str = data.toString()
            var lines = str.split(/(\r?\n)/g);
            console.log(lines.join(""));
        }
    );
    prc.on(
        'close',
    )
}

module.exports = {
    startRedis
}