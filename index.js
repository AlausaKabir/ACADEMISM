import server from './app/routes/index'
import keys from './app/config/keys'
import MongoConnection from './app/config/database'

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