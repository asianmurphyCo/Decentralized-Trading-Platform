const pool = require('../database.js')

module.exports = async (req, res) => {
    const reqData = req.body;
    const username = reqData.username

    try {
        // uid = userId from db
        // const uid = ((await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`)).rows[0]).userid;
      
        
        const uidData = await pool.query(`SELECT * FROM user_login WHERE username = '${username}';`);
        const uid = uidData.rows[0].userid;
        const userDataSet = await pool.query(`SELECT * FROM user_info WHERE userId = '${uid}';`);
        const userInfo = userDataSet.rows[0]
        console.log(userInfo)
        // const userInfo = data.rows[0].json();
        // console.log(uid)

        return res.json(userInfo); 
    } catch (err) {
        return console.error(err);
    }
    
}