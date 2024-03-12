const jwt = require('jsonwebtoken')

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        
        next()
    } catch(error) {
        res.clearCookie("token");
        return res.redirect('/home')
    }
}