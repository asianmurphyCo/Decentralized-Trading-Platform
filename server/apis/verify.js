const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    // const tokenHeaderKey = 'jwt-token';
    // const authToken = req.headers[tokenHeaderKey];
    // const token = req.cookies.token;

    // try {
    //     const verified = jwt.verify(authToken, process.env.SECRET_KEY);
    //     if (verified) {
    //         return res.status(200).json({ status: 'logged in', message: 'success' });
    //     } else {
    //         // Access denied
    //         return res.status(401).json({status : "invalid auth", message: "error"});
    //     }
    // } catch (error) {
    //     // Access denied
    //     return res.status(401).json({status : "invalid auth", message: "error"});
    // }

    const token = req.cookies.token;

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if (verified) {
            return res.status(200).json({ status: 'logged in', message: 'success' });
        } else {
            // Access denied
            return res.status(401).json({status : "invalid auth", message: "error"});
        }
    } catch (error) {
        res.status(403).json({status : "invalid auth", message: "token expired"});
        res.clearCookie("token");
        res.redirect("/login");
    }

    
}