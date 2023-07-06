
const StudentRepository = require('../database/repository/student-repository');
const { AppError, APIError } = require('../utils/app-errors');

class studentService {

    constructor(  ){
        this.repository = new StudentRepository;
    }
    async studentRegister (payload)  {

        try{

          const studentResult =  await this.repository.createStudent(payload);
          
          return studentResult;
        
        }catch(err){
            throw new AppError('Data Not Found')
        }
    }

    async findStudentList(params){
        let findBy = {ownerId : params.ownerId};
        try{

            if(params.search){
                findBy["fullName"] = { $regex: params.search, $options: 'i' }; 
            }

            findBy['isActive'] = true;
            const studentList = await  this.repository.getListOfStudents(findBy);
           
            return studentList;

        }catch(err){
            throw new AppError("Data Not Found")
        }
    }

    async updateStudent (stdntData)  {
        let { requestId, ...payload }= stdntData;
        try{

          payload['updatedTime'] = new Date().getTime();
          console.log(payload)
          const updtStudentResult =  await this.repository.updateStudentRecord(requestId, payload);
          
          return updtStudentResult;
        
        }catch(err){
            throw new AppError('Data Not Found')
        }
    }

    async getStudentDetails(findBy){
        try{

            const getStdntResult = await this.repository.getStdntDetails( findBy );

            return getStdntResult;

        }catch(err){
            throw new AppError('Data Not Found')
        }
    }
}

module.exports = studentService;