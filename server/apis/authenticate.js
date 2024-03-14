const jwt = require('jsonwebtoken')
const pool = require('../database.js')
require("dotenv").config();

module.exports = async (req, res) => {
    const {username, password} = req.body

    try {
        // fetching user with the right username from db
        const user = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`);
        const fetchedUser = user.rows[0];
        console.log(user)
        // if there is a user with that same username, compare their passwords
        // if the creds are right, create a jwt token and set it to the cookie of the user with status 200
        // otherwise, return status code 401 with invalid login message
        if (user.rows.length !== 0) {
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