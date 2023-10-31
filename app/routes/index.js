import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Logger from '../config/logger.js'
import authRoute from '../routes/auth-route.js'


const app = express()

global.logger = Logger.createLogger({ label: 'ACADEMISM' })

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: logger.stream }))

app.get('/', (req, res) => {
    res.send('WELCOME TO ACADEMISM!')
})

app.use('/auth', authRoute)

export default app