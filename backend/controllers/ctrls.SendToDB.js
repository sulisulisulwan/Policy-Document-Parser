const sendToDB = async(req, res) => {

  console.log('should respond')
  res.sendStatus(201);
  
}

module.exports = {
  sendToDB
}