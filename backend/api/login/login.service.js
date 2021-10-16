const createToken = require('../../utils/createToken');
const { loginRepository } = require('./login.repository');
const {getEncryptedData} = require("../../utils/md5");

async function loginService(req, res) {
    try {
        const { email, password } = req.body;
        const response = { isUserLoggedIn: false, userData: null };

        if (!email || !password) {
            throw new Error('not valid user details');
        }

        const uuid = getEncryptedData(`${email}-${password}`);
        const userData = await loginRepository(req, uuid);
        if (userData) {
            response.isUserLoggedIn = true;
            response.userData = {...userData};

            // user is logged in successfully so we create jwt on res.cookie
            createToken(res, uuid);
        }

        return response;
    } catch (e) {
        console.error(`Error during loginService: ${e}`);
        throw e;
    }
}

module.exports = { loginService };
