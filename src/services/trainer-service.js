const TrainerRepository = require("../database/repository/trainer-repository");
const { generateReqId } = require("../lib/utils");
const { APIError, AppError } = require("../utils/app-errors");


class TrainerService{

    constructor(){
         this.repository = new TrainerRepository;
    }

    async getTrainerList(params){
        try{
           let findBy = { isActive : true, ownerId : params.ownerId }; 
           
           const trainerResult = await this.repository.getTrainerListData(findBy);
           
           return trainerResult;
        }catch(err){
            APIError("Data Not Found")
        }

    }

    async registerTrainer(req){
        let payload = req.body;

        try{

            payload['trainerId'] = await generateReqId();
            payload['createTime'] = new Date().getTime(); 
            payload['status'] = 'Active';
            payload['isActive'] = true;

            const trainerResult = await this.repository.createTrianer(payload);
            return trainerResult;
             
        }catch(err){
            AppError("Data Not Found");
        }
    }

    async getTrainerDetails(trainerId){

        try{

            let findBy = { trainerId : trainerId };

            const trainerResult = await this.repository.findTrainerDetails(findBy);

            return trainerResult;

        }catch(err){
            AppError("Data Not Found")
        }
    }

    async getTrainers(params) {
        try{

            let findBy = { isActive : true, ownerId : params.ownerId };

            const trainers = await this.repository.getAssignedTrainers(findBy);

            return trainers;

        }catch(err){
            AppError("Data Not Found")
        }
    } 

    async updateTrainerDetails(body){
        
        try {

            let { trainerId, ...payload } = body;

            payload['updatedTime'] = new Date().getTime();

            const trainerResult = await this.repository.updateTrainerDetails(trainerId, payload);

            return trainerResult;

        } catch(err){
            AppError("Data Not Found")
        }
    }

}

module.exports = TrainerService;