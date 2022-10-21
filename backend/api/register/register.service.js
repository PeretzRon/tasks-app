const {registerRepository} = require('./register.repository');
const {getEncryptedData} = require("../../utils/md5");
const logger = require('rp.libs.logger');


async function registerService(req, res) {
    try {
        const {email, password, ...userDetails} = req.body;
        const uuid = getEncryptedData(`${email}-${password}`);
        logger.info(`create new user start: email: ${email}`, req)
        return await registerRepository(uuid, email, userDetails, req);
    } catch (e) {
        logger.error(`Error during loginService: ${e}`, req);
        throw e;
    }
}

module.exports = {registerService};
