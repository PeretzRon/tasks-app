const jwt = require("jsonwebtoken");

module.exports = createToken;

function createToken(res, uuid) {
    const token = jwt.sign({uuid: uuid}, process.env.JWT_SECURITY_KEY, {expiresIn: '24h'});
    const options = {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 24h
    };

    res.cookie('token', token, options);
}
