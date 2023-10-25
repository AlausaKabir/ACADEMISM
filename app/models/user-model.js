import mongoose from 'mongoose'
import { STUDENT_TYPES } from '../utils/constants/options.js'
import mongoosePaginate from 'mongoose-paginate-v2'

const StudentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        },
        stateOfOrigin: {
            type: String,
            required: true
        },
        LGA: {
            type: String,
            required: true
        },
        religion: {
            type: String,
            required: true
        },
        nameOfKin: {
            type: String,
            required: true
        },
        relationshipWithNOK: {
            type: String,
            required: true
        },
        courseOfStudy: {
            type: String,
            required: true
        },
        modeOfEntry: {
            type: String,
            required: true
        },
        yearOfEntry: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },

    },
    {timestamps: true}
)

StudentSchema.plugin(mongoosePaginate)

const StudentModel = mongoose.model('Student', StudentSchema)

export default StudentModel