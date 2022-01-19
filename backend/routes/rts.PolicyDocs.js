const router = require('express').Router();
const controllers = require('../controllers');
const { ParsePDFToText, SendToMachineLearningAPI, SendToDB } = controllers;
const { uploadToTemp } = require('../middleware/');
const { parsePDFToText } = ParsePDFToText;
const { sendToMachineLearningAPI } = SendToMachineLearningAPI;
const { sendToDB } = SendToDB;

router.post('/upload', uploadToTemp, parsePDFToText, sendToMachineLearningAPI, sendToDB);

module.exports = router;