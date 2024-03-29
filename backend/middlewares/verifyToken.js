const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.cookies?.['token'];
    if (!token) return res.status(401).json({error: true, msg: 'Access Denied, Please log in', isUnauthorized: true});

    try {
        jwt.verify(token, process.env.JWT_SECURITY_KEY, (error, decoded) => {
            if (error) {
                throw error;
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: false, msg: 'Invalid Token', isUnauthorized: true});
    }
};
