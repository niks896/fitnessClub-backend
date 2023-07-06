const paymentRepository = require("../database/repository/payments-repository");
const { generateReqId } = require("../lib/utils");
const { APIError } = require("../utils/app-errors");
const studentService = require("./student-service");


class paymentService{

    constructor(){
        this.repository = new paymentRepository();
        this.studentRep = new studentService();
    }

    async createPayments(body){
        try{
            const { requestId, pendingFees, ...payload} = body;
            payload['paymentId'] = await generateReqId();
            payload['createTime'] = new Date().getTime();
            payload['pendingFees'] = pendingFees;
            payload['requestId'] = requestId;
                let studentData = {
                    requestId : requestId,
                    pendingFees : pendingFees,
                    paymentStatus : 'paid'
                }
            

            let result = await this.repository.createPaymentRecord(payload);
            if(result){
                await this.studentRep.updateStudent(studentData);
            }

            return result;

        }catch(err){
            APIError("DATA Not Found")
        }
    } 

    async getPayments(params){
        try{
            let findBy = { ownerId : params.ownerId };
            var pageSize = parseInt(params.pageSize) || 5;
            var pageNumber = parseInt(params.pageNumber) || 0;

            if (params.paymentId) {
                findBy['paymentId'] = params.paymentId;
            }
    
            if (params.filter) {
                findBy = {
                    $or: [
                        { studentName: { $regex: params.filter, $options: 'i' } },
                        { totalFees: { $regex: params.filter, $options: 'i' } }
                    ]
                }
            }
    
            let pipeline = [
                {
                    "$match": findBy,
                },
                {
                    "$project": {
                        _id: 0,
                        createdTime: 0,
                        updatedTime: 0,
                        createdBy: 0
                    }
                },
                {
                    "$facet": {
                        "data": [
                            {
                                "$skip": pageSize * pageNumber
                            },
                            {
                                "$limit": pageSize
                            }
                        ],
                        "pagination": [
                            {
                                "$count": "total"
                            }
                        ]
                    }
                }
            ]

            let result = await this.repository.getPaymentList(pipeline);

            return result;

        }catch(err){
            APIError("Data Not Found")
        }
    }

    async deletePayment(body){

        try{

            let result = await this.repository.deletePayments({ paymentId : body.paymentId});

            return result;

        }catch(err){
            APIError("Data Not Found")
        }
    }
}

module.exports = paymentService
