const AWS = require('aws-sdk');

exports.uplaodDocuments = async (req, res) => {

    let payload = {};

    try{

        if(req.Body){
            payload.file = req.Body.fileData;
        }
        
        const params = {
        Bucket: 'example-my-app-react',
        Key: 'image' + payload.file.name,
        Body: payload.file,
        ContentType: 'image/jpeg'
      };
      const s3 = new AWS.S3({
        bucketName: 'example-my-app-react',
        dirName: 'images',
        region: 'ap-south-1',
        accessKeyId: 'AKIAXPFC4ABLELGPLJX4',
        secretAccessKey: '1ps7cmjRHKmGumZ5nred6vXLtYtcTtsaEXQPUzvR',
      })

      s3.upload(params).promise()
        .then((data) => {
            res.send(data.Location)
        })
        .catch((err) => console.log(err))

    }catch(err){
        throw new Error(err.toString())
    }

}