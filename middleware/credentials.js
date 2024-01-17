const allowedOrigins = require('../config/allowedOrigin')

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (!allowedOrigins[origin]) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}


module.exports = credentials;