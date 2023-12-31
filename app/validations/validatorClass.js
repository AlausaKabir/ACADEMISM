import { errorResponse } from '../utils/response.js'


/**
 * @description Validation class
 */

class Validations {
    /**
     * validates an input based on a schema
     * @static 
     * @param {Joi} schema - The validation schema
     * @param {Object} object - The data to be validated
     * @memberof GenericHelper
     * @returns {boolean}
     */
    static validateInput(schema, object) {
        const { error, value } = schema.validate(object)
        return { error, value }
    }

    /**
     * @static
     */
    static validate(schema) {
        return (req, res, next) => {
            const { error } = Validations.validateInput(schema, {
                ...req.body,
                ...req.query,
                ...req.params
            })
            if (!error) {
                return next();
            }
            logger.error(error.details[0].message)
            errorResponse(res, 400, error.details[0].message)
        }
    }
}

const { validate } = Validations

export { validate }