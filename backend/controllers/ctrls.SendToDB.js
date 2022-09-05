


const sendToDB = async (req, res) => {

  /*
  
  NOTE: Consider splitting up all of these "controllers" into micro services.

  Expect a schema such as:

  Parsed Document:
    _id: <id hash>
    originalFileName: <the original file name of the pdf to be associated with the Firestore record>
    rawText: <the parsed .txt file from the PDF>
    jsonFromMLAPI: <the parsed json from the machine learning api>
  
  */



  res.sendStatus(201);
};

module.exports = {
  sendToDB
}
