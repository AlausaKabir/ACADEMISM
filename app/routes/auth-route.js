import express from 'express'
import { validate } from '../validations/validatorClass.js'
import { signUpSchema, loginSchema } from '../validations/schemas/auth.js'
import AuthController from '../controllers/auth-controller.js'

const router = express()

router.post(
    '/signup',
    validate(signUpSchema),
    AuthController.studentRegistrationController

)

router.post('/login',
    validate(loginSchema),
    AuthController.studentLoginController)

router.put('/get-matric-no',
    validate(loginSchema),
    AuthController.studentMatricNoController)
router.get('/get-matric-no',)


export default router