const express = require('express');
// const bcrypt = require('bcrypt') // for pw hashing
// var cors = require('cors')
const jwt = require('jsonwebtoken');
// const cookieParser = require("cookie-parser");
// var low = require('lowdb')
// var FileSync = require('lowdb/adapters/FileSync')
// var adapter = new FileSync('./database.json')
// var db = low(adapter)
// import axios from 'axios'

const authenticate = require('./apis/authenticate');

const app = express();


// app.use(cors())
// app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]});
});

app.post("/authenticate", authenticate);

// Default route handler
app.use((req, res) => {
    res.status(404).send("Not found");
});

app.listen(5000, () => {
    console.log("listening on port 5000");
});