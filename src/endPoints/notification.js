const { notificationService } = require("../services/notification-service")

module.exports = (app) => {

    this.service = new notificationService();

    app.get("/api/getNotifications",async (req, res, next) => {

        try{

            let result = await this.service.getNotificationsData(req.query);

            res.send(result);

        }catch(err){
            next(err)
        }
    })

}