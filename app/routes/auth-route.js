import express from 'express'
import { validate } from '../validations/validatorClass.js'
import { signUpSchema } from '../validations/schemas/auth.js'
import AuthController from '../controllers/auth-controller.js'

const router = express()

router.post(
    '/signup',
    validate(signUpSchema),
    AuthController.studentRegistrationController


)


export default router