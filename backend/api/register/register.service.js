const {registerRepository} = require('./register.repository');
const {getEncryptedData} = require("../../utils/md5");

async function registerService(req, res) {
    try {
        const {email, password, ...userDetails} = req.body;
        const uuid = getEncryptedData(`${email}-${password}`);
        return await registerRepository(uuid, email, userDetails);
    } catch (e) {
        console.error(`Error during loginService: ${e}`);
        throw e;
    }
}

module.exports = {registerService};
