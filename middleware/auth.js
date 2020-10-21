const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
    // check token from header
    const token = req.header('x-auth-token');
    
    //if not token, unauthorized
    if (!token) {
        return res.status(401).json({ msg: "No token, Authorization denied" })
    }

    try {
        //verify token

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
        
    } catch (error) {
        //throw error for invalid token
        res.status(401).json({ msg: 'Token invalid'})
    }
}



