const createToken = require('../../utils/createToken');
const {loginRepository} = require('./login.repository');
const {getEncryptedData} = require("../../utils/md5");
const logger = require('../../utils/logger')(module);

async function loginService(req, res) {
    try {
        const {email, password} = req.body;
        const response = {isUserLoggedIn: false, userData: null};

        if (!email || !password) {
            throw new Error('not valid user details');
        }

        const uuid = getEncryptedData(`${email}-${password}`);
        const userData = await loginRepository(req, uuid);
        if (userData) {
            response.isUserLoggedIn = true;
            const tasks = Object.entries(userData.tasks)
                .map(([key, value]) => {
                    return {...value, _id: key};
                });
            response.userData = {tasks, firstName: userData.firstName, lastName: userData.lastName};
            // user is logged in successfully so we create jwt on res.cookie
            createToken(res, uuid);
        }

        return response;
    } catch (e) {
        logger.error(`Error during loginService: ${e}`, req);
        throw e;
    }
}

module.exports = {loginService};
