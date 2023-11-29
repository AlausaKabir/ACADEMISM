import StudentModel from '../models/student-model.js'
import bcrypt from 'bcrypt'
import HelperFunctions from '../utils/jwt/helper-functions.js'
import UserToken from '../utils/jwt/user-token.js'
import { MatriculationNumber } from '../utils/constants/students-matric.js'

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
                message: 'Student already registered, Contact the admin for resolution'
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
    static async studentLoginService(data) {
        const { email, password } = data

        const student = await StudentModel.findOne({ email });
        if (!student)
            return {
                statusCode: 401,
                message: 'Invalid credentials or Student not found'
            }
        const isPasswordValid = await bcrypt.compare(password, student.password)

        if (!isPasswordValid)
            return {
                statusCode: 401,
                message: 'Invalid credentials'
            }

        if (student) {
            const token = await UserToken.generateUserAccessSecretKey(student)
            logger.info(`userLoginService -> User Login Token created successfully: ${token}`)

            student.password = undefined

            return {
                statusCode: 200,
                message: 'Student Successfully Logged In',
                data: student,
                token
            }
        }
    }

    static async studentMatricNoService(data) {
        const { email, courseOfStudy } = data;

        const student = await StudentModel.findOne({ email });
        if (!student) {
            return {
                statusCode: 401,
                message: 'Student credentials not found'
            };
        }

        console.log(student, "student");
        if (!courseOfStudy) {
            return {
                statusCode: 400,
                message: 'Please provide the course to study ',
            };
        }

        if (student.courseOfStudy !== courseOfStudy) {
            return {
                statusCode: 400,
                message: 'Mismatch in the course of study',
            };
        }

        // Update registrationCount for the specific courseOfStudy
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { _id: student._id },
            { $inc: { registrationCount: 1 } },
            { new: true, useFindAndModify: false }
        );

        console.log("Updated Student:", updatedStudent);

        const registrationCount = updatedStudent ? updatedStudent.registrationCount || 0 : 0;

        const matriculationNumber = MatriculationNumber.generateMatriculationNumber(courseOfStudy, registrationCount);

        // Update matriculationNumber for the specific student
        await StudentModel.updateOne(
            { _id: updatedStudent._id },
            { $set: { matriculationNumber } }
        );

        // const matricNoExist = await StudentModel.findOne({ matriculationNumber });
        // if (matricNoExist) {
        //     return {
        //         statusCode: 400,
        //         message: 'Student already has a Matriculation Number. Contact the School admin'
        //     };
        // }

        return {
            statusCode: 200,
            message: 'Matriculation number generated and Student data updated successfully',
            data: { matriculationNumber },
        };
    }



}



export default AuthService