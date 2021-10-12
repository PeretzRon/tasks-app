const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.cookies?.['token'];
    if (!token) return res.status(401).json({error: 'Access Denied'});

    try {
        jwt.verify(token, process.env.JWT_SECURITY_KEY, (error, decoded) => {
            if (error) {
                throw error;
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: 'Invalid Token'});
    }
};
