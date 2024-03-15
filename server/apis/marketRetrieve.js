const pool = require('../database.js')

module.exports = async(req, res) => {
    try {
        const digitalAsset = await pool.query(`SELECT * FROM digital_assets`);

        console.log(digitalAsset.rows)

        if (digitalAsset.rows.length === 0) {
            return res.status(404).json({message: "No record"});
        }
    
        return res.send(digitalAsset.rows)
    } catch(err) {
        console.error(err);
    }
    
}

