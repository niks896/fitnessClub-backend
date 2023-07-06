const bodyParser = require('body-parser');
const cors = require('cors');
const handlErrors = require('../src/utils/error-handler');
const  student  = require('./endPoints/student');
const trainer = require('./endPoints/trainer');
const Owner = require('./endPoints/owner');
const payments = require('./endPoints/payments');
const schedular1 = require('./schedular/schedular-1');
const notification = require('./endPoints/notification');

module.exports = async (app)=> {

    app.use(bodyParser.json({limit: '1mb'}));
    app.use(bodyParser.urlencoded({limit: '1mb', extended: true }))
    app.use(cors());

    //api
    student(app);
    trainer(app);
    Owner(app);
    payments(app);
    notification(app);
    schedular1();

    // error handlining middleware
    app.use(handlErrors);
}
