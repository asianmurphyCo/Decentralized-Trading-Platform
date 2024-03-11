const jwt = require('jsonwebtoken')
require("dotenv").config();

const getUser = async (username) => {
    // traverse database and return a user json
}
module.exports = async (req, res) => {
    const {username, password} = req.body

    console.log(req.body);
    console.log(username);
    console.log(password);


    // const user = db.get('user').value().filter((user) => username === user.username)

    //TODO: CHUA FETCH DUOC
    // const userJSON = fetch('/database.json');
    // console.log(userJSON);

    // // console.log(userJSON);

    // const data = userJSON.json();
    // console.log(data);

    // dummy user for api test
    const user = ({"username": "admin", "password": "admin"});

    if (user !== "") {
        if (user.username !== username || user.password !== password) {
            return res.status(401).json({message: 'Invalid login'});        
        } 

        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "1h"});

        res.cookie("token", token, {
            httpOnly:true
        })

        
        res.status(200).json({message: 'success', token: token});
        
    }
}