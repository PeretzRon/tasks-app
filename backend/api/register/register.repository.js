const db = require("../../services/db");
const logger = require('rp.libs.logger');


async function registerRepository(uuid, email, userDetails, req) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({email: email}, {$setOnInsert: {...userDetails, email: email, uuid: uuid, tasks: {}}}, {upsert: true});
    } catch (e) {
        logger.error(`Error during registerRepository: ${e}`, req);
        throw e;
    }
}

module.exports = {registerRepository};
