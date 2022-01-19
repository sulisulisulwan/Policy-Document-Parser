const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const { PolicyDocs } = routes;


app.use(express.static(path.resolve(__dirname, '../client/dist')))
app.use(express.urlencoded({ extended: true}));
app.use(express.json({ limit: '50mb' }))
app.use('/policy-docs', PolicyDocs)

module.exports = app;