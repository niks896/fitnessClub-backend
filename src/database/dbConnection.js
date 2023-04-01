const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const dbConnection =async () => {

    try{

        let client = null;

        const getClient = async () => {
            if( client ){
                return client;
            }

            if( !process.env.DBURL){
                throw new Error("DB URL NOT FOUND");
            }

            client = await mongoClient.connect(process.env.DBURL, { useNewUrlParser:true, maxPoolSize: 50, useUnifiedTopology:true })
            console.log('Db Connected');
            return client;
        }

        return {getClient}

    }catch(err){
        throw new Error(err.toString())
    }

}

module.exports = dbConnection();