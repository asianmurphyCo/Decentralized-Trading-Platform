// push datase tên, description, price, owner address asset lên market từ form
const pool = require('../database.js')

module.exports = async(req, res) => {
    const {assetName, assetDesc, assetPrice, userAddress} = req.body

    try {

        console.log(assetName);
        console.log(assetDesc);
        console.log(assetPrice);
        console.log(userAddress);
        await pool.query(`INSERT INTO digital_assets (imgsrc,assetName, assetDesc, assetPrice, ownerAddress) 
        VALUES ('../src/components/assets/rainbow-icon.png','${assetName}', '${assetDesc}', '${assetPrice}', '${userAddress}')`);
        
        return res.status(200).json({status: "200", message: "success"});
    } catch (err) {
        console.error(err);
        return res.status(400).json({message: "An error occured."});
    }
}