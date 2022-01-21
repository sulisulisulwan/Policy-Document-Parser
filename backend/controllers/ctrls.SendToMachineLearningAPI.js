
const sendToMachineLearningAPI = async(req, res, next) => {

  /*Notes about this step:
  
  The original PDF document would be sent for parsing to an API such as CradlAI or Nanonets.  The parsing may be imperfect given that
  the PDF would be a new case for the machine learning model, however the resultant parsing would be saved in the database along with the parsed text.
  The original PDF would be added to the aggregate documents in the API to allow for additional training with this newest data.
  Periodically, we would update the existing documents in the database with a reparsing using the most currently updated algorithm learned 
  by the API parser.

  The database could be a DynamoDB and Elasticsearch or MongoDB to allow for elasticity in the data updating process.
  Everytime new iterations of the machine learning models are produced, the client will be notified that an update 
  has occured and could be asked to validate the changes to the parsing.

  */
  console.log('send to machine learning api')
  next()
}

module.exports = {
  sendToMachineLearningAPI
}