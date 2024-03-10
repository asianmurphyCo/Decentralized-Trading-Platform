const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { MongoClient } = require('mongodb');

const app = express();

// MongoDB connection setup
const uri =
  'mongodb+srv://admin:JQ9zHxTAk3KidFsd@dashboard.g6mojcq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Export 
module.exports = {
  client,
  app,
};