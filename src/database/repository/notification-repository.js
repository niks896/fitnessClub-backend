const database = require('../dbConnection');
const { DBNAME, PAYMENTS, NOTIFICATION } = require('../../constants/database');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class notification {

    async getNotifications (findBy) {
        try{

            let client = await(await database).getClient();

            let result = await client.db(DBNAME)
            .collection(NOTIFICATION)
            .find(findBy)
            .project({_id : 0})
            .toArray() 

            return result;

        }catch(err){
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Enable to find the notifications"
            )
        }
    }
}

module.exports = {
    notification
}