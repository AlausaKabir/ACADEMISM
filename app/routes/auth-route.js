import express from 'express'
import {validate} from '../validations/validatorClass.js'
import {signUpSchema} from '../validations/schemas/auth.js'

const router = express()

router.post(
    '/signup',
    validate(signUpSchema),
    
    
)


export default router