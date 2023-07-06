const paymentService = require('../services/payment-service')

module.exports = (app) => {

    let service = new paymentService();

    app.post("/api/createPayments", async (req, res, next) => {
        try{

            let result = await service.createPayments(req.body);

            res.send(result)

        }catch(err){
            next(err)
        }
    })

    app.get("/api/getPayments", async (req, res, next) => {
        try{

            let result = await service.getPayments(req.query);

            res.send(result)

        }catch(err){
            next(err)
        }
    })

    app.post("/api/deletePayment", async (req, res, next)=> {
        try{

            let result = await service.deletePayment(req.body);

            res.send(result)

        }catch(err){
            next(err)
        }
    })
}