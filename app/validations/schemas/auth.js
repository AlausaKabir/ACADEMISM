import joi from 'joi'
import { STUDENT_STATUS, STUDENT_TYPES, COURSE_TO_STUDY, STAFF_TYPES } from '../../utils/constants/options.js'

const signUpSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi.string().required(),
    dateOfBirth: joi.string().required(),
    address: joi.string().required(),
    nationality: joi.string().required(),
    stateOfOrigin: joi.string().required(),
    LGA: joi.string().required(),
    religion: joi.string().required(),
    nameOfParent: joi.string().required(),
    parentAddress: joi.string().required(),
    parentPhoneNumber: joi.string().required(),
    nextOfKin: joi.string().required(),
    relationshipWithNOK: joi.string().required(),
    courseOfStudy: joi.string().valid(...Object.values(COURSE_TO_STUDY)).required(),
    modeOfEntry: joi.string().required(),
    yearOfEntry: joi.string().required(),
    password: joi.string().min(8).required(),
    studentType: joi.string().valid(...Object.values(STUDENT_TYPES)).required(),

})

export { signUpSchema }