const pool = require('../database.js')

module.exports = async(req, res) => {
    const username = req.body

    try {
        const user = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`)
        const userId = user.rows[0].userid;
        console.log(userId);
        
        const transactionHistory = await pool.query(`SELECT * FROM transactions_history WHERE userid = '${userId}'`);

        if (transactionHistory.rows.length === 0) {
            return res.status(404).json({message: "No record"});
        }
    
        return res.send(digitalAsset.rows)
    } catch(err) {
        console.error(err);
    }
}