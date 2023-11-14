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

        const currentYear = new Date().getFullYear().toString().slice(-2);


        const currentDate = new Date();
        const monthPart = (currentDate.getMonth() + 1).toString().padStart(2, '0');


        const coursePart = COURSE_CODE[course] || "00";


        const registrationPart = registrationCount.toString().padStart(2, '0');


        const matriculationNumber = `${currentYear}${monthPart}${coursePart}${registrationPart}`;

        return matriculationNumber;
    }

}

export { MatriculationNumber }