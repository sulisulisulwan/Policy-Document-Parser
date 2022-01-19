const path = require('path');
const fs = require('fs/promises');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1);

const sendToAPI = async (req, res, next) => {

  const { file } = req;
  const { filename } = file;
  const savedTempFile = path.resolve(__dirname, `../tmp/client-uploads/${filename}`);
  const outputTextFilePath = path.resolve(__dirname, `../parsed-files/${filename}.txt`);
  
  pdfParser.loadPDF(savedTempFile);
  pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
  pdfParser.on('pdfParser_dataReady', async (pdfData) => {
    await fs.writeFile(outputTextFilePath, pdfParser.getRawTextContent());

    try {
      await fs.unlink(savedTempFile)
      console.log('Done parsing, txt file created, tmp file removed')
      next();
    } catch(err) {
      next(err);
    }
  })


}

module.exports = { sendToAPI };