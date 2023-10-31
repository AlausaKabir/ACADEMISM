import COURSE_CODE from './options.js'
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
        // Get the current date to obtain the month part
        const currentDate = new Date();
        const monthPart = (currentDate.getMonth() + 1).toString().padStart(2, '0');

        // Ensure the course code is a two-digit number using the mapping
        const coursePart = COURSE_CODE[course] || "00";

        // Ensure the registration count is a two-digit number
        const registrationPart = registrationCount.toString().padStart(2, '0');

        // Concatenate the parts to form the matriculation number
        const matriculationNumber = `${monthPart}${coursePart}${registrationPart}`;

        return matriculationNumber;
    }

}

export { MatriculationNumber }