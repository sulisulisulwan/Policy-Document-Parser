const router = require('express').Router();
const controllers = require('../controllers');
const { ExtractTextFromPDF, SendToMachineLearningAPI, SendToDB } = controllers;
const { uploadToTemp } = require('../middleware/');
const { extractTextFromPDF } = ExtractTextFromPDF;
const { sendToMachineLearningAPI } = SendToMachineLearningAPI;
const { sendToDB } = SendToDB;

router.post('/upload', uploadToTemp, extractTextFromPDF, sendToMachineLearningAPI, sendToDB);

module.exports = router;