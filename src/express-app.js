const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const handlErrors = require('../src/utils/error-handler');
const  student  = require('./endPoints/student');
const trainer = require('./endPoints/trainer');

module.exports = async (app)=> {

    app.use(bodyParser.json({limit: '1mb'}));
    app.use(bodyParser.urlencoded({limit: '1mb', extended: true }))
    app.use(cors());

    //api
    student(app);
    trainer(app);

    // error handlining middleware
    app.use(handlErrors);
}
