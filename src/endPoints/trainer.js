const TrainerService = require("../services/trainer-service")



module.exports = (app) => {

    const service = new TrainerService(); 

    app.get("/api/getTrainerList", async (req, res, next) => {
        
        try{

            const trainerResult = await service.getTrainerList(req.query);

            res.send(trainerResult);

        }catch(err){
            next(err)
        }
    })

    app.post("/api/trainerRegister", async (req, res, next) => {

        try {

            const trainerResult = await service.registerTrainer(req);

            res.send(trainerResult);

        }catch(err){
            next(err)
        }
    } )

    app.get("/api/getTrainerDetails", async (req, res, next) =>{
        try {

            const trainerResult = await service.getTrainerDetails(req.query.trainerId);

            res.send(trainerResult);

        }catch(err){
            next(err)
        }   
    })

    app.get("/api/getTrainers", async (req, res, next) => {
        try{

            const trainers = await service.getTrainers(req.query)
            
            res.send(trainers);
        }catch(err){
            next(err)
        }
    })


    app.post("/api/updateTrainerRecord", async (req,res,next) => {

        try{

            const trainerResult = await service.updateTrainerDetails(req.body);

            res.send(trainerResult);

        }catch(err){
            next(err)
        }
    } )
}