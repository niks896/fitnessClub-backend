const { generateReqId } = require('../lib/utils');
const studentService = require('../services/student-service');

module.exports = (app) => {

    const service = new  studentService();

    app.post( "/api/studentRegister", async (req, res, next) => {
        let payload = {};
        try{
    
            payload = req.body;

            payload['requestId'] = await generateReqId();
            payload['createdTime'] = new Date().getTime();
            payload['status'] = 'Active';
            payload['isActive'] = true;
            payload['paymentStatus'] = 'paid';

           const studentResult =  await service.studentRegister(payload);
    
            res.send(studentResult);
    
        }catch(err){
            next(err);
        }

    })

    app.get("/api/getStudentList", async (req, res, next) => {
        
        try{
         
            const studentListResult = await service.findStudentList(req.query);

            res.send(studentListResult);
        }catch(err){
            next(err);
        }
    })

    
    app.post("/api/updateStudent", async (req, res, next) => {
        let payload = {}
        try{
            
            payload = req.body;

            const updtStudentResult = await service.updateStudent(payload);

            res.send(updtStudentResult);
        }catch(err){
            next(err);
        }
    })

    app.get( "/api/getStudentDetails", async ( req, res, next ) => {
        let findBy = {};
        try {
            findBy['requestId'] = req.query.requestId;
            
            const getStudentResult = await service.getStudentDetails(findBy);

            res.send(getStudentResult);
        } catch(err) {
            next(err)
        }
    } )
}