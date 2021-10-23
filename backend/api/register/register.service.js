const {registerRepository} = require('./register.repository');
const {getEncryptedData} = require("../../utils/md5");
const logger = require('../../utils/logger')(module);


async function registerService(req, res) {
    try {
        const {email, password, ...userDetails} = req.body;
        const uuid = getEncryptedData(`${email}-${password}`);
        logger.info(`create new user start: email: ${email}`)
        return await registerRepository(uuid, email, userDetails);
    } catch (e) {
        logger.error(`Error during loginService: ${e}`);
        throw e;
    }
}

module.exports = {registerService};
