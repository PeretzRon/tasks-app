const db = require("../../utils/db");

async function loginRepository(req, uuid) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .findOne({uuid: uuid});
    } catch (e) {
        console.error(`Error during loginRepository: ${e}`);
        throw e;
    }
}

module.exports = {loginRepository};
