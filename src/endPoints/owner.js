const OwnerService = require("../services/owner-service")


module.exports = (app) => {

    this.service = new  OwnerService();

    app.post("/api/createOwner", async (req, res, next) => {

        try{

            let result = await this.service.createOwnerDetails(req.body);

            res.send(result);

        }catch(err){
            next(err)
        }
    })

    app.get("/api/getOwnerDetails", async (req, res, next) => {

        try{

            let result = await this.service.getOwenerDetails(req.query.emailId);

            res.send(result);

        }catch(err){
            next(err)
        }
    })

    app.post("/api/updateOwnerDetails", async (req, res, next) =>{

        try{

            let result = await this.service.updateOwner(req.body);

            res.send(result); 

        }catch(err){
            next(err)
        }
    })
}