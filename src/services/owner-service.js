const OwnerRepository = require("../database/repository/owner-repository");
const { generateReqId } = require("../lib/utils");
const { AppError } = require("../utils/app-errors")


class OwnerService {

    constructor(){
        this.repository = new OwnerRepository;
    }

    async createOwnerDetails(payload){

        try{

            payload['ownerId'] = await generateReqId();
            payload['createdTime'] = new Date().getTime();

            let ownerResult  = await this.repository.createOwner(payload);

            return ownerResult;

        }catch(err){
            throw new AppError(
                "Data Not Found"
            )
        }
    }

    async getOwnerDetails(emailId){

        try{

            let findBy = { emailId : emailId };

            let result = await this.repository.getOwener(findBy);

            return result;

        }catch(err){
            throw new AppError(
                "Data Not Found"
            )
        }
    }

    async updateOwner(payload){
        
        try{
            const { ownerId, ...data } = payload;
            
            let result = await this.repository.updateOwnerDetails(findBy, data);
            
            return result;  
        }catch(err){
            throw new AppError(
                "Data Not Found"
            )
        }
    }
}

module.exports = OwnerService