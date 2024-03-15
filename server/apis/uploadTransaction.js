const pool = require('../database.js')

module.exports = async(req, res) => {
    const {transID, transDate, trans_amount, transNote, userAddress, tarAddress, username} = req.body;

    try {
        var userId = await pool.query(`SELECT userId FROM user_login WHERE username = '${username}'`)
        userId = userId.rows[0]

        if (userId) {
            await pool.query(`INSERT INTO transactions_history (transID, transDate, trans_amount, transNote, userAddress, tarAddress, userId) 
            VALUES ('${transID}', '${transDate}', '${trans_amount}', '${transNote}', '${userAddress}', '${tarAddress}', '${userId}')`);

            return res.status(200).json({message: 'success'})
        }
    } catch(err) {
        console.error(err);
        return res.status(403).json({message: err})
    }
}