const router = require('express').Router();
const { uploadToTemp } = require('../middleware/');
const controllers = require('../controllers');
const { MachineLearningAPI, SendToDB } = controllers;
const { sendToAPI } = MachineLearningAPI;
const { sendToDB } = SendToDB;

router.post('/upload', uploadToTemp, sendToAPI, sendToDB);

module.exports = router;