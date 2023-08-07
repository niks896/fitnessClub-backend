const { DBNAME, USERS } = require("../../constants/database");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const database = require('../dbConnection');
const bcrypt = require('bcryptjs');
const OwnerRepository = require("./owner-repository");
const jwt = require('jsonwebtoken');
const OwnerService = require("../../services/owner-service");

class authenticationRepository {

    constructor() {
        this.service = new OwnerService();
    }

    async register(findBy, payload) {

        try {

            let client = await (await database).getClient();

            let query = {
                $and: [
                    { username: { $regex: findBy.username, $options: 'i' } },
                    { emailId: { $regex: findBy.emailId, $options: 'i' } }
                ]
            }
            let exist = await client.db(DBNAME).collection(USERS).findOne(query)

            if (exist) {
                return { errMsg: 'username or Email Id already Taken' }
            }

            let { password, ...userData } = payload;

            userData['password'] = await bcrypt.hash(password, 12)

            let result = await client.db(DBNAME).collection(USERS).insertOne(userData);

            // Create token
            const token = jwt.sign(
                { email: userData.emailId },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            if (result) {
                let { password, ...p } = userData;
                this.service.createOwnerDetails(p);
            }

            return {
                token
            }


        } catch (err) {
            throw new APIError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                "Error in registering user"
            )
        }
    }

    async login(findBy, password ){


        try {

            let client = await (await database).getClient();

            let query = { username: findBy.username}
            let user = await client.db(DBNAME).collection(USERS).findOne(query)
    
            if( user && ( await bcrypt.compare( password, user.password ))){
    
                const token = jwt.sign(
                    {
                        email: user.emailId    
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '2h'
                    }
                )

                return {
                    token
                };
            }

            return { errMsg : 'invalid Credentials' }

        } catch(err){
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