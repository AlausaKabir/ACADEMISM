import dotenv from 'dotenv'
import mongoose from 'mongoose'
import keys from './keys.js'

dotenv.config()

const connectionString = keys.database.mongoDb[keys.environment].connectionString

const MongoConnection = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info('Connected to MongoDB!:)')
    } catch (error) {
        logger.error('Erro connecting to MongoDB:', error)
    }
}

export default MongoConnection