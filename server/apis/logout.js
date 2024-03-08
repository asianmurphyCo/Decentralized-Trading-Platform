module.exports = async (req, res) => {
    const isLoggedIn = req.body;

    if (isLoggedIn) {
        res.clearCookie("token");
        return res.status(200).json({message: 'success'});
    } 
        return res.status(403).json({message: 'not logged in'});
}