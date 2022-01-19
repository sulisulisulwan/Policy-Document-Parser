const path = require('path');
const fs = require('fs/promises');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser(this, 1);


const parsePDFToText = async (req, res, next) => {

  const { file } = req;
  const { filename } = file;
  const savedTempFile = path.resolve(__dirname, `../tmp/client-uploads/${filename}`);
  const outputTextFilePath = path.resolve(__dirname, `../parsed-files/${filename}.txt`);
  
  const handleParsedPDFData = async (pdfData) => {

    try {
      await fs.writeFile(outputTextFilePath, pdfParser.getRawTextContent());
      await fs.unlink(savedTempFile)
      next();
    } catch(err) {
      next(err);
    }
  
  }

  pdfParser.loadPDF(savedTempFile);
  pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
  pdfParser.on('pdfParser_dataReady', handleParsedPDFData)

}

module.exports = { parsePDFToText };