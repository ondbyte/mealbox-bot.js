import { app } from "./app"

async function main() {
    var exit = async () => {
        await app.stop()
        console.log("exiting wab")
        process.exit()
    }

    var started = await app.start()
    if(!started) exit()

    ///listen for ctrl+c to finish the process
    process.once("SIGINT", exit)

}

main()