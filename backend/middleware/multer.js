const multer = require('multer');

const multerUploadEngine = multer({
  dest: '../tmp/',
  onFileUploadStart: function (fieldname, filename) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    return `${filename}-${uniqueSuffix}`;
  },
  onFileUploadData: function (file, data) {
    console.log(`${data.length} of ${file.fieldname} arrived`);
  },
  onFileUploadComplete: function (file, data) {
    console.log(`${file.fieldname} uploaded to ${file.path}`);
  }
})

module.exports = multerUploadEngine;