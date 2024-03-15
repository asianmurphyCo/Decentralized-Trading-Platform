const pool = require('../database.js')

module.exports = async(req, res) => {
    const username = req.body

    try {
        var userId = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`)
        userId = userId.rows[0].userid;
        
        const transactionHistory = await pool.query(`SELECT * FROM transactions_history WHERE userid = '${userId}'`);

        if (transactionHistory.rows.length === 0) {
            return res.status(404).json({message: "No record"});
        }
    
        return res.send(digitalAsset.rows)
    } catch(err) {
        console.error(err);
    }
}