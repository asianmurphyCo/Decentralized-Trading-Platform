const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { MongoClient } = require('mongodb');
//const bcrypt = require('bcrypt');
//var cors = require('cors');
//var low = require('lowdb');
//var FileSync = require('lowdb/adapters/FileSync');
//var adapter = new FileSync('./database.json');
//var db = low(adapter);
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


const app = express();  

// MongoDB connection setup
const uri = 'mongodb+srv://admin:JQ9zHxTAk3KidFsd@dashboard.g6mojcq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser())

// Export 
module.exports = {
  client,
  app,
};