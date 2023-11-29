import { COURSE_CODE } from './options.js'
// Modify the generateMatriculationNumber function to accept department names
/**
 * @description Matriculation No. Generation
 */

class MatriculationNumber {
    /**
     * 
     * @param {*} course - The Course of Students 
     * @param {*} registrationCount - Serial generations
     * @returns 
     */
    static generateMatriculationNumber(course, registrationCount) {
        const currentYear = new Date().getFullYear().toString().slice(-2);
        const currentDate = new Date();
        const monthPart = (currentDate.getMonth() + 1).toString().padStart(2, '0');

        // Ensure the course code is a two-digit number using the mapping
        const coursePart = COURSE_CODE[course] || "00";

        // Increment registrationCount to start from 1
        const incrementedCount = registrationCount + 1;

        // Ensure the registration count is a two-digit number
        const registrationPart = incrementedCount.toString().padStart(2, '0');

        const matriculationNumber = `${currentYear}${monthPart}${coursePart}${registrationPart}`;

        return matriculationNumber;
    }
}

export { MatriculationNumber }