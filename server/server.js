const express = require('express');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors');
const jwt = require('jsonwebtoken');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('./database.json');
var db = low(adapter);
var bodyParser = require('body-parser');
var logger = require('morgan');
const pool = require("./database");

// setup dependencies
const app = express();
const jwtSecretKey = 'hello';
const uri = "mongodb+srv://admin:JQ9zHxTAk3KidFsd@dashboard.g6mojcq.mongodb.net/?retryWrites=true&w=majority&appName=Dashboard";
const client = new MongoClient(uri);

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up route
const port = 5035;

// Api Testing
// app.get("/api", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM user_login");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Authentication
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    const user = db.get('user').value().filter((user) => username === user.username);

    if (user.length === 1) {
        if (user.username === username && user.password === password) {
            localStorage.setItem("username", username);
            localStorage.setItem("isLoggedIn", "true");

            res.status(200).json({message: 'success'});
            // Redirect to the profile page
            // navigate("/profile");
        }
    }
});

  //Dashboard Database
  app.get('/database', async (req, res) => {
    let db = await client.db("Dashboard");
    let coll = await db.collection("Dashboard");
    let coinlist = await coll.find().toArray();
    res.status(200).send(coinlist);
  });
  app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
  });

  
  