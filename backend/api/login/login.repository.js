const db = require("../../services/db");
const logger = require('rp.libs.logger');

async function loginRepository(req, uuid) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .findOne({uuid: uuid});
    } catch (e) {
        logger.error(`Error during loginRepository: ${e}`, req);
        throw e;
    }
}

module.exports = {loginRepository};
