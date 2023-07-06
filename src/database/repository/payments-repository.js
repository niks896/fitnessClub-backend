const { DBNAME, PAYMENTS } = require('../../constants/database');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');
const database = require('../dbConnection');

class paymentRepository{

    async createPaymentRecord(payload){
        try{

            let client = await (await database).getClient();
            
            const result = await client.db(DBNAME).collection(PAYMENTS)
            .insertOne(payload)
            
            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Error on create payment"
            )
        }
    }

    async getPaymentList(findBy){
        try{

            let client = await (await database).getClient();

            let result = await client.db(DBNAME)
            .collection(PAYMENTS)
            .aggregate(findBy)
            .toArray()

            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to find the payment List"
                )
        }
    }

    async deletePayments(payload){
        try{

            let client = await (await database).getClient();

            let result = await client.db(DBNAME)
            .collection(PAYMENTS)
            .deleteOne(payload)

            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to find the payment List"
                )
        }
    }
}


module.exports = paymentRepository;