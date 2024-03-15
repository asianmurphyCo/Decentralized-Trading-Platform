const pool = require('../database.js')

module.exports = async(req, res) => {
    const {username} = req.body

    try {
        const user = await pool.query(`SELECT userid FROM user_login WHERE username = '${username}'`)
        var userId = user.rows[0]
        userId = userId.userid;
        
        const transactionHistory = await pool.query(`SELECT * FROM transaction_history WHERE userid = '${userId}'`);
        console.log(transactionHistory)

        if (transactionHistory.rows.length === 0) {
            return res.status(404).json({message: "No record"});
        }
    
        return res.send(transactionHistory.rows)
    } catch(err) {
        console.error(err);
    }
}