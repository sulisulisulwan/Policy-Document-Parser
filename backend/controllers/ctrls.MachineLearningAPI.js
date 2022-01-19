const fs = require('fs');


const sendToAPI = async (req, res, next) => {

  const { file } = req;

  console.log(file)

  // const readStream = fs.createReadStream();
  // const writeStream = fs.createWriteStream();


  

  //send file to api

  next();
}

module.exports = { sendToAPI };