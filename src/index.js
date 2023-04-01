const express = require('express');
const dotenv = require('dotenv');

const  expressApp  = require('../src/express-app');
const dbConnection = require('./database/dbConnection');

const startServer = async () => {
    const PORT = process.env.PORT || 3200;
    const app = express();
    dotenv.config();

    await (await dbConnection).getClient();
    await expressApp(app);

    app.listen(PORT, () => {
        console.log("server is running on port" + ' ' + PORT)
    }).on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

startServer();