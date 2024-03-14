const jwt = require('jsonwebtoken')
const pool = require('../database.js')
var SHA256 = require('crypto-js/sha256.js')
require("dotenv").config();

module.exports = async (req, res) => {
    const {username, password} = req.body
    const encryptedUserPwd = SHA256(password).toString()

    try {
        // fetching user with the right username from db
        const user = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`);
        const fetchedUser = user.rows;
        console.log(fetchedUser)
        console.log(encryptedUserPwd)
        console.log(fetchedUser.userpwd !== encryptedUserPwd)
        console.log(fetchedUser.userpwd)
        console.log(encryptedUserPwd)
        
        // if there is a user with that same username, compare their passwords
        // if the creds are right, create a jwt token and set it to the cookie of the user with status 200
        // otherwise, return status code 401 with invalid login message
        if (fetchedUser.length !== 0) {                
            if (fetchedUser[0].userpwd !== encryptedUserPwd) {
                
                return res.status(401).json({message: 'Invalid login'});        
            } 
    
            const token = jwt.sign(fetchedUser[0], process.env.SECRET_KEY, {expiresIn: "1h"});
    
            res.cookie("token", token, {
                httpOnly:true
            })
    
            
            res.status(200).json({message: 'success', token: token});
            
        }
    } catch(err) {
        console.error(err);
    }
    
    


    
}