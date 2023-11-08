import dotenv from 'dotenv'

dotenv.config()

const Port = process.env.PORT

const keys = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT,
    domain: process.env.DOMAIN || `http://localhost:${Port}`,
    BCRYPT: process.env.BCRYPT || 10,
    adminUrl: process.env.ADMIN_URL || 'admin',
    jwt: {
        refresh: process.env.JWT_REFRESH_TOKEN,
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES,
        refreshExpires: process.env.JWT_REFRESH_EXPIRES
    },
    database: {
        mongoDb: {
            development: {
                connectionString: process.env.MONGO_URI_DEV
            }
        }
    }

}

export default keys