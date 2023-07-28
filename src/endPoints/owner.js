const OwnerService = require("../services/owner-service");
const { authenticateToken } = require("../token-verify");


module.exports = (app) => {

    this.service = new  OwnerService();

    app.post("/api/createOwner", authenticateToken, async (req, res, next) => {

        try{

            let result = await this.service.createOwnerDetails(req.body);

            res.send(result);

        }catch(err){
            next(err)
        }
    })

    app.get("/api/getOwner", authenticateToken, async (req, res, next) => {

        try{

            let result = await this.service.getOwnerDetails(req.query.emailId);

            res.send(result);

        }catch(err){
            next(err)
        }
    })

    app.post("/api/updateOwnerDetails", authenticateToken, async (req, res, next) =>{

        try{

            let result = await this.service.updateOwner(req.body);

            res.send(result); 

        }catch(err){
            next(err)
        }
    })
}