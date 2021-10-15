const jwt = require("jsonwebtoken");

module.exports = createToken;

function createToken(uuid, res) {
    const token = jwt.sign({uuid: uuid}, process.env.JWT_SECURITY_KEY, {expiresIn: '6h'});
    const options = {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 240 // 6h
    };

    res.cookie('token', token, options);
}
