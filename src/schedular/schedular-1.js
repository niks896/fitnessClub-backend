const cron = require('node-cron');
const { insertNotifications } = require('../Notification/notification');
const StudentRepository = require('../database/repository/student-repository');

module.exports = () => {
    cron.schedule('*/25 * * * * *',async () => {
        console.log("schedular running")
        
        let service = new StudentRepository();

       let result = await service.getListOfStudents({isActive : true})
       let currDate = new Date();
       for(let key of result){
        let c =new Date(key.createdTime);
        let newDate;
        if( key.memberShipType.memberShipType == 'One Year' ){
            newDate = c.setMonth(new Date().getMonth() + 12)
        }else if(key.memberShipType.memberShipType == 'Three Month') {
            newDate = c.setMonth(new Date().getMonth() + 3)
        } else{
           newDate = c.setMonth(new Date().getMonth() + 1)
        }
        let dueDate = new Date(newDate).getTime();
        key['dueDate'] = dueDate;

        if(new Date( dueDate - currDate.getTime()).getDate() == 1){
            insertNotifications(key);
        }
       }
    
    }, { scheduled : false} )
}


