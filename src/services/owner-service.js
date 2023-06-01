const OwenerRepository = require("../database/repository/owner-repository");
const { generateReqId } = require("../lib/utils");
const { AppError } = require("../utils/app-errors")


class OwnerService {

    constructor(){
        this.repository = new OwenerRepository();
    }

    async createOwnerDetails(payload){

        try{

            payload['requestId'] = await generateReqId();
            payload['createdTime'] = new Date().getTime();

            let ownerResult  = await this.repository.createOwner(payload);

            return ownerResult;

        }catch(err){
            throw AppError(
                "Data Not Found"
            )
        }
    }

    async getOwenerDetails( emailId){

        try{

            let findBy = { emailId : emailId };

            let result = this.repository.getOwenerDetails(findBy);

            return result;

        }catch(err){
            throw  AppError(
                "Data Not Found"
            )
        }
    }

    async updateOwner(payload){
        
        try{
            const { requestId, ...data } = payload;
            
            let result = await this.repository.updateOwnerDetails(findBy, data);
            
            return result;  
        }catch(err){
            throw AppError(
                "Data Not Found"
            )
        }
    }
}

module.exports = OwnerService