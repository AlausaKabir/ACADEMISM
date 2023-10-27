import StudentModel from '../models/student-model.js'
import bcrypt from 'bcrypt'

/** 
 * @description Auth Service class 
*/

class AuthService {
    /**
     * @description function to signup or register students
     * @param {Object} data - req body object from the AuthController
     * @return {Object} Returned object 
     */
    static async studentRegistrationService(data) {
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            dateOfBirth,
            address,
            nationality,
            stateOfOrigin,
            LGA,
            religion,
            nameOfParent,
            parentAddress,
            parentPhoneNumber,
            nextOfKin,
            relationshipWithNOK,
            courseOfStudy,
            modeOfEntry,
            yearOfEntry,
            password,
            studentType,
        } = data

        if (!email && !phoneNumber) {
            return {
                statusCode: 400,
                message: 'Please provide either a valid email or phone number for registration'
            }
        }

        const studentExist = await StudentModel.findOne({
            $or: [{ email: email.toLowerCase() }, { phoneNumber }],
        })
        if (studentExist)
            return {
                statusCode: 409,
                message: 'Student Email or Phone number already exist'
            }

        const student = await StudentModel.create({

        })
    }
}



export default AuthService