const pool = require('../database.js')
var SHA256 = require('crypto-js/sha256.js')

module.exports = async (req, res) => {
    const {regUsername, regPwd} = req.body;
    console.log(req.body);

    try {
        const existedUsername = (await pool.query(`SELECT * FROM user_login WHERE username = '${regUsername}'`)).rows;

        console.log(regUsername);
        console.log(regPwd);
        console.log(existedUsername);

        if (existedUsername.length === 0) {
            const cipheredPwd = SHA256(regPwd).toString();
            await pool.query(`INSERT INTO user_login (username, userPwd) VALUES ('${regUsername}', '${cipheredPwd}');`)
            return res.status(200).json({status: "200", message: "success"});
        } else {
            return res.status(404).json({status: "404", message: "This username has been registered."});
        }

        

    } catch(err) {
        console.error(err);
        return res.status(300).json({message: "An error occurred while updating database"});
    }

}