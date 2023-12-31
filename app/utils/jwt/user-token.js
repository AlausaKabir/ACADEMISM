import jwt from 'jsonwebtoken'
import keys from '../../config/keys.js'
import StudentModel from '../../models/student-model.js'


class UserToken {
    /**
     * @description function to generate a user access token
     * @param {Object} user - req body object from user service
     * @returns {Object} - Returned objects
     **/
    static async generateUserAccessSecretKey(student) {
        const payload = {
            id: student.id || student._id,
        };
        const options = {
            expiresIn: keys.jwt.expires,
        };
        const token = await jwt.sign(payload, keys.jwt.secret, options);
        return token;
    }

    /**
     * @description function to verify an user access token
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    static async verifyUserAccessSecretKey(userToken) {
        try {
            const { id } = await jwt.verify(userToken, keys.jwt.secret);

            const user = await StudentModel.findById(id);

            if (!user)
                return {
                    statusCode: 404,
                    message: 'Unauthorized',
                };

            return {
                statusCode: 200,
                message: 'Success',
                data: user,
            };
        } catch (error) {
            return {
                statusCode: 400,
                message: error.message,
            };
        }
    }
}

export default UserToken;
