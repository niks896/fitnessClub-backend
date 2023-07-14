const { authenticationService } = require("../services/authentication.-serivce");



module.exports = (app) => {

    this.service = new authenticationService();

    app.post( '/login', async (req, res, next) => {

    } )

    app.post('/api/register',async (req, res, next) => {

        try{

            let result = await this.service.registerUser(req.body);

            res.send( result )

        }catch(err){
            next(err)
        }

    } )
}