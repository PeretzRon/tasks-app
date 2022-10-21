const db = require("../../services/db");
const logger = require('rp.libs.logger');

module.exports = {getTasks, addNewTask, deleteTask, updateTask};

async function getTasks(uuid, req) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .find({uuid: uuid})
            .project({_id: 0, tasks: 1, firstName: 1, lastName: 1})
            .toArray();
    } catch (e) {
        logger.error(`Error during repository getTasks: ${e}`, req);
        throw e;
    }
}

async function addNewTask(uuid, taskID, task, req) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({uuid: uuid}, {$set: {[`tasks.${taskID}`]: task}});
    } catch (e) {
        logger.error(`Error during repository addNewTask: ${e}`, req);
        throw e;
    }
}

async function deleteTask(uuid, taskID, req) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({uuid: uuid}, {$unset: {[`tasks.${taskID}`]: ""}});
    } catch (e) {
        logger.error(`Error during repository deleteTask: ${e}`, req);
        throw e;
    }
}

async function updateTask(uuid, taskID, task, req) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({uuid: uuid}, {$set: {[`tasks.${taskID}`]: task}});
    } catch (e) {
        logger.error(`Error during repository updateTask: ${e.toString()}`, req);
        throw e;
    }
}

