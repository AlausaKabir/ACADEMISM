import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'
import keys from '../../config/keys.js'
import { STAFF_TYPES } from '../../utils/constants/options.js'


class HelperFunctions {
    /**
     * @description this function is used to hash the password
     * @param {*} password - password to be hashed 
     * @returns {Object} - returns the hashed password 
     */

    static async hassPassword(password) {
        const hash = await bcrypt.hash(password, Number(keys.BCRYPT))
        return hash
    }

    /**
     * @description this function is used to compare the passwords
     * @param {*} password - password to be compared 
     * @param {*} hash - hased password 
     * @returns (Object) - returns true if the password mathches the hashed password, else returns false 
     */
    static async comparedPassword(password, hash) {
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    }

    /**
     * @description this function is used to capitalize teh first letter of a string
     * @param {*} string - string to be capitalized 
     * @returns {Object} - returns the capitalized string(s)
     */
    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    /**
     * @description this functyion is used to create directory if it does not exist
     * @param {*} dirPath - directory path
     * @returns {Object} - returns the directory path 
     */
    static async createDirectoryIfNotExist(directory = 'uploads') {
        const dir = path.join(__dirname, '../../../', directory)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
    }

    /**
     * @description this function is to convert a string to number(s)
     * @param {*} string = String to be converted 
     * @returns {Object} - returns the number 
     */
    static async convertToNumber(page = 1, limit = 200) {
        const pageNumber = parseInt(page, 10)
        const limitNumber = parseInt(limit, 10)
        return { pageNumber, limitNumber }
    }

    /**
     * @description function to check if a user is a super staff
     * @param {Object} data - req body object from the AuthController
     * @return {Boolean} Returned object 
     */
    static isSuperStaff(data) {
        const { superStaff } = keys
        const { email, password } = data

        if (email === superStaff.email && !password) {
            superStaff.password = undefined
            return superStaff
        }
        return false
    }
}

export default HelperFunctions