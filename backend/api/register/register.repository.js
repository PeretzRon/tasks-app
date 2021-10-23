const db = require("../../services/db");
const logger = require('../../utils/logger')(module);


async function registerRepository(uuid, email, userDetails) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({email: email}, {$setOnInsert: {...userDetails, email: email, uuid: uuid, tasks: {}}}, {upsert: true});
    } catch (e) {
        logger.error(`Error during registerRepository: ${e}`);
        throw e;
    }
}

module.exports = {registerRepository};
