const possibleErrorResponses = {
  'Uploaded file is an invalid file.  It must be a PDF': (err, res) => res.status(400).json(err),
}

const errorResponseHandlers = async (error, res) => {
  const message = error.message
  let errorResponse = possibleErrorResponses[message];
  if (errorResponse === undefined) {
    errorResponse = (err, res) => res.sendStatus(500);
  }s
  console.error(error)
  return errorResponse;
}


module.exports = errorResponseHandlers;