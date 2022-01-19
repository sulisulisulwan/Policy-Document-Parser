const multer = require('multer');
const handleErrorResponse = require('../error-response-handlers/errorResponseHandlers.js')
const path = require('path');

const isPDF = (file) => {
  return (file.mimetype === 'application/pdf');
}

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const [ err, destination ] = isPDF(file) ? [null, path.resolve(__dirname, '../tmp/client-uploads')] : [new Error('Uploaded file is an invalid file.  It must be a PDF'), null]
    cb(err, destination);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random()) * 1E9}`
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  }

})

const uploadToTemp = multer({ storage }).single('upload-file');

module.exports = async (req, res, next) => {
  uploadToTemp(req, res, async (err) => {
    if (err) {
      const handler = await handleErrorResponse(err, res);
      handler(null, res);   
    }
    next()
  });
}
