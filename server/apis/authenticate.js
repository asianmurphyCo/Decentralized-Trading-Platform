const jwt = require('jsonwebtoken')
const pool = require('../database.js')
require("dotenv").config();

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
    const userMock = ({"username": "admin", "password": "admin"});

    try {
        const user = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`);
        const fetchedUser = user.rows[0];

        if (user !== "") {
            if (fetchedUser.userpwd !== password) {
                return res.status(401).json({message: 'Invalid login'});        
            } 
    
            const token = jwt.sign(fetchedUser, process.env.SECRET_KEY, {expiresIn: "1h"});
    
            res.cookie("token", token, {
                httpOnly:true
            })
    
            
            res.status(200).json({message: 'success', token: token});
            
        }
    } catch(err) {
        console.error(err);
    }
    
    


    
}