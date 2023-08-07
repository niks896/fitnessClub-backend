const { DBNAME, NOTIFICATION } = require('../constants/database');
const  database  = require('../database/dbConnection');
const { generateReqId } = require('../lib/utils');
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const insertNotifications = async (payload) => {

    try{

        let obj = {}; 
        obj['notificationId'] = await generateReqId();
        obj['ownerId'] = payload['ownerId'];
        obj['fullName'] = payload['fullName'];
        obj['phNumber'] = payload['phNumber'];
        obj['amount'] = payload['amount'];
        obj['dueDate'] = payload['dueDate'];
        obj['status'] = 'NOT_PAID';
        obj['memberShip'] = payload['memberShipType']['memberShipType']
        obj['createdTime'] = new Date().getTime();
        let client = await (await database).getClient();

        await client.db(DBNAME)
        .collection(NOTIFICATION)
        .insertOne(obj)


    }catch(err){
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Error on create Notification record"
            )
    }
}

module.exports = {
    insertNotifications
}