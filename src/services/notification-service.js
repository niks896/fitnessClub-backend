const { notification } = require("../database/repository/notification-repository");
const { AppError } = require("../utils/app-errors");


class notificationService {

    constructor(){
        this.repository = new notification();
    }

    async getNotificationsData(params){
     
        try{
            let findBy = {}
            if(params){
                findBy['isRead'] = params.isRead;
            }
            let result = await this.repository.getNotifications(findBy);

            return result;

        }catch(err){
            throw new AppError(
                "Data not found"
            )
        }
    }
}

module.exports = {
    notificationService
}