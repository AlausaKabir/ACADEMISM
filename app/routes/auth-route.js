import express from 'express'
import keys from '../config/keys.js'

const router = express()

router.post(
    '/signup',
    validate()
    
)


export default router