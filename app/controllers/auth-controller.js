import { errorResponse, successResponse } from '../utils/response.js'
import AuthService from '../services/auth-services.js'

/**
 * @description Authentication Controller 
 */


class AuthController {
    /**
     * @description register a student Controller
     * @param {Object} req - HTTP Request 
     * @param {Object} res - HTTP Response
     * @return {Object} Returned object
     */
    static async studentRegistrationController(req, res) {
        try {
            const result = await AuthService.studentRegistrationService(req.body)

            logger.info(
                `studentRegistrationController -> result: ${JSON.stringify(result)}`
            )
            if (result.statusCode === 409)
                return errorResponse(res, result.statusCode, result.message)

            return successResponse(
                res,
                result.statusCode,
                result.message,
                result.data
            )
        } catch (error) {
            logger.error(
                `studentRegistrationController -> error: ${JSON.stringify(error.message)}`
            )
            return errorResponse(res, 500, error.message)
        }
    }

}

export default AuthController