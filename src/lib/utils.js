
const generateReqId = async () => {
    return new Date().getTime() + "" + Math.floor(Math.random() * 1000 + 1); 
}

module.exports = {
    generateReqId
}