const { authenticationRepository } = require("../database/repository/authentication-repository");
const { APIError } = require("../utils/app-errors");


class authenticationService {

    constructor(){
        this.repository = new authenticationRepository();
    }

    async registerUser(payload){

        try{
            let findBy = { username : payload.username}

            let result = await this.repository.register(findBy, payload);

            return result;

        }catch(err){
            APIError("Data Not found")
        }
    }   
}

module.exports = { authenticationService }