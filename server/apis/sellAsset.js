// push datase tên, description, price, owner address asset lên market từ form
const pool = require('../database.js')

module.exports = async(req, res) => {
    const {itemName, itemDes, itemPrice, ownerAddress} = req.body

    try {
        await pool.query(`INSERT TO digital_assets (assetName, assetDesc, assetPrice, ownerAddress) 
        VALUES ('${itemName}', '${itemDes}', '${itemPrice}', '${ownerAddress}')`);

        return res.status(200).json({status: "200", message: "success"});
    } catch (err) {
        console.error(err);
        return res.status(400).json({message: "An error occured."});
    }
}