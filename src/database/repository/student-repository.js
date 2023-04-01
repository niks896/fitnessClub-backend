const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const {DBNAME, STUDENT_REGISTER }= require('../../constants/database');
const database = require('../dbConnection');

class StudentRepository {

    constructor(){

    }

    async createStudent( payload) {
      try{

        let client = await (await database).getClient();
        const response = await client.db(DBNAME).collection(STUDENT_REGISTER).insertOne(payload);

        return response;

      } catch(err){
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Error on create Student record"
            )
      }
    }

    async getListOfStudents(findBy){

        try{
          console.log(findBy)
            let client = await (await database).getClient();
         
            const response = await client.db(DBNAME).collection(STUDENT_REGISTER)
            .find(findBy)
            .sort({createdTime : -1})
            .project({_id : 0})
            .toArray();
            return response;
        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to find student List"
            )
        }
    }

    async updateStudentRecord( requestId, payload ) {

        let findBy={ requestId : requestId };
        try {

            let client = await (await database).getClient();

            const result = await client.db(DBNAME)
            .collection(STUDENT_REGISTER)
            .findOneAndUpdate( 
                findBy,
                { $set : payload }
             )

             return result;

        } catch (err) {
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to update student record"
            )
        }
    }

    async getStdntDetails(findby){
        
        try {

            let client = await (await database).getClient();

            const result = await client.db(DBNAME)
            .collection(STUDENT_REGISTER)
            .find(
                findby
            )
            .project({_id : 0})
            .toArray()

            return result;

        } catch(err) {
            throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Enable to Find student record"
            )
        }
    }
}

module.exports = StudentRepository;