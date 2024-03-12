const pool = require('../database.js')

module.exports = async (req, res) => {
    const {username} = req.body;
    // const username = 'admin';
    console.log(username);
    try {
        // uid = userId from db
        // const uid = ((await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`)).rows[0]).userid;

        
        const uidData = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`);
        const uid = uidData.rows[0];
        // const uid = 4534535;
        const data = await pool.query(`SELECT * FROM user_info WHERE userId = '${uid}'`);
        const userInfo = data.rows[0];
        console.log(uid)

        res.status(200).json({message: "success"});
        return res.json(userInfo); 
    } catch (err) {
        return console.error(err);
    }
    
}