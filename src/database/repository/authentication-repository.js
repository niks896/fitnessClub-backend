const { DBNAME, USERS } = require("../../constants/database");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const database = require('../dbConnection');
const bcrypt = require('bcryptjs');
const OwnerRepository = require("./owner-repository");

class authenticationRepository {

    constructor(){
        this.repository = new OwnerRepository();
    }

   async register(findBy, payload){

    try{

        let client = await(await database).getClient();

        let query = { 
            $or: [
                { username: { $regex: findBy.username, $options: 'i' } },
                { password: { $regex: findBy.username, $options: 'i' } }
            ]
        }
        let exist = await client.db(DBNAME).collection(USERS).findOne(query)

        if( exist){
            return {errMsg : 'EmailId or username already Taken', status : 400 }
        }

        let { password, ...userData } = payload;

        userData['password'] =await bcrypt.hash( password, 12 )

        let result = await client.db(DBNAME).collection(USERS).insertOne(userData);

        if(result){
          const { password, ...ownerData} = userData;  
            this.repository.createOwner(ownerData);
        }

        return { username :  userData.username, emailId: userData.emailId, status: 'success',
        message: 'User Registered!', }


    }catch(err){
        throw new APIError(
            'API Error',
            STATUS_CODES.INTERNAL_ERROR,
            "Error in registering user"
        )
    }
    }
}

module.exports = { 
    authenticationRepository
}