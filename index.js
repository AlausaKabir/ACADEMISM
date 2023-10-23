import server from './app/routes/index.js'
import keys from './app/config/keys.js'
import MongoConnection from './app/config/database.js'

const Port = keys.port || 8888

async function start() {
    try {
        await MongoConnection()
        server.listen(Port, () => {
            logger.info(`Server started on port ${Port}`)
        })
    } catch (error) {
        logger.error(`Error startng server: ${error.message}`)
    }
}

start()