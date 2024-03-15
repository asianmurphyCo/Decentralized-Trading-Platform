const pool = require('../database.js')

module.exports = async(req, res) => {
    const {txID, txDate, amount, userAddr, targetAddress, username} = req.body;

    try {
        const user = await pool.query(`SELECT * FROM user_login WHERE username = '${username}'`)
        const userId = user.rows[0].userid

        console.log(txDate)
        console.log(userId)
        if (userId) {
            await pool.query(`INSERT INTO transaction_history (transDate, trans_amount, userAddress, tarAddress, userId) 
            VALUES ('${txDate}', '${amount}', '${userAddr}', '${targetAddress}', '${userId}')`);

            return res.status(200).json({message: 'success'})
        }
    } catch(err) {
        console.error(err);
        return res.status(403).json({message: err})
    }
}