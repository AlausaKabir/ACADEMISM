import StudentModel from '../models/student-model.js'
import bcrypt from 'bcrypt'
import HelperFunctions from '../utils/jwt/helper-functions.js'

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
            firstName: HelperFunctions.capitalizeFirstLetter(firstName),
            lastName: HelperFunctions.capitalizeFirstLetter(lastName),
            phoneNumber,
            email: email.toLowerCase(),
            password: await HelperFunctions.hassPassword(password),
            studentType,
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
        })

        student.password = undefined

        logger.info(`studentRegistrationService -> Student Registered Successfully: ${JSON.stringify(student)}`)
        return {
            statusCode: 201,
            message: 'Student Successfully Registered',
            data: student
        }
    }

    /**
     * @description function to log in a Student 
     * @param {Object} data - req body object from the AuthController
     * @return {Object} Returned object
     */
}



export default AuthService