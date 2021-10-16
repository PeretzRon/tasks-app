const db = require("../../utils/db");

async function registerRepository(uuid, email, userDetails) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({email: email}, {$set: {...userDetails, email: email, uuid: uuid}}, {upsert: true});
    } catch (e) {
        console.error(`Error during registerRepository: ${e}`);
        throw e;
    }
}

module.exports = {registerRepository};
