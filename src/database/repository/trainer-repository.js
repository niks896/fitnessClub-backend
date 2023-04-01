const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const database = require('../dbConnection');
const { DBNAME, TRAINER_REGISTER} = require('../../constants/database');

class TrainerRepository {

    async getTrainerListData(findBy){

        try {

            let client = await (await database).getClient();

            const result = await client.db(DBNAME)
            .collection(TRAINER_REGISTER)
            .find(findBy)
            .project({ _id: 0})
            .toArray();

            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to Find the Trainer List"
            )
        }
    }

    async createTrianer(payload){
        try{

            let client = await (await database).getClient();

            const result = await client.db(DBNAME).collection(TRAINER_REGISTER)
            .insertOne( payload );

            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Error on create Trainer record"
            )
        }
    }

    async findTrainerDetails(findBy){

        try{

            let client = await (await database).getClient();
            const result = await client.db(DBNAME).collection(TRAINER_REGISTER)
            .find(findBy)
            .project({_id: 0})
            .toArray()

            return result;
            
        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to find trainer record"
            )
        }
    }

    async updateTrainerDetails(requestId, payload){
        
        try{
      
            let findBy = { requestId : requestId };
            let client = await (await database).getClient();
            const result = await client.db(DBNAME).collection(TRAINER_REGISTER)
            .findOneAndUpdate(
                findBy,
                { $set : payload }
            )

            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to update student record"
            )
        }
    }
}

module.exports = TrainerRepository;