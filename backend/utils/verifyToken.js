const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.cookies?.['token'];
    if (!token) return res.status(401).json({error: 'Access Denied'});

    try {
        jwt.verify(token, '1231', (error, decoded) => {
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
