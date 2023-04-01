const { createLogger, transports } = require('winston');
const { AppError } = require('./app-errors');

const LogErrors = createLogger ({
    transports : [
        new transports.Console()
        // new transports.File(({ fileName : 'app_error.log' }))
    ]
})

class ErrorLogger {
    constructor(){}

    async loggError(err){
        console.log('=======Start Error Logger=====');
        LogErrors.log({
            private : true,
            level :'error',
            message: `${new Date()}-${JSON.stringify(err)}`
        })
        return false; 
    }


    isTrustError(error){
        if( error instanceof AppError ){
            return error.isOperational;
        }else{
            return false;
        }
    }

}


const errorHandler = async (err, req, res, next) => {

    const errorLogger = new ErrorLogger();

    process.on('uncaughtException', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason;
    })

    process.on('uncaughtExceptionMonitor', (error) => {
        errorLogger.loggError(error);
        if(errorLogger.isTrustError(err)){
            console.log('process exit // need restart ')
        }
    })

    if(err){
        await errorLogger.loggError(err);
        if(errorLogger.isTrustError(err)){
            if(err.errorStack){
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({ 'message' : errorDescription })
            }
            return res.status(err.statusCode).json({'message' : err.message})
        }else{
            console.log('process exit // wrong with flow need restart')
        }
        return res.status(err.statusCode).json({'message': err.message})
    }
}

module.exports = errorHandler;