const { DBNAME, OWNER_REGISTER } = require("../../constants/database");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const  database  = require('../dbConnection');


class OwenerRepository {

    constructor(){

    }

    async createOwner(payload){

        try{
            let client = await (await database).getClient();
           
            const response = await client.db(DBNAME)
            .collection(OWNER_REGISTER)
            .insertOne(payload)

            return response;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Error on create Owner"
            )
        }
    }

    async getOwenerDetails(findBy){

        try{
console.log(findBy)
            let client = (await database).getClient();

            const response = await client.db(DBNAME)
            .collection(OWNER_REGISTER)
            .find(findBy)
            .project({_id : 0})
            .toArray()

            return response;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to find onwer details"
            )
        }
    }

    async updateOwnerDetails(findBy, payload){
        try{

            let client = (await database).getClient();

            const response = await client.db(DBNAME)
            .collection(OWNER_REGISTER)
            .findOneAndUpdate(
                findBy,
                payload
            )

            return response;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to update Owner Details"
            )
        }
    }

} 

module.exports = OwenerRepository;