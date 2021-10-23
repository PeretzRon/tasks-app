const db = require("../../services/db");

module.exports = {getTasks, addNewTask, deleteTask, updateTask};

async function getTasks(uuid) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .find({uuid: uuid})
            .project({_id: 0, tasks: 1})
            .toArray();
    } catch (e) {
        console.error(`Error during repository getTasks: ${e}`);
        throw e;
    }
}

async function addNewTask(uuid, taskID, task) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({uuid: uuid}, {$set: {[`tasks.${taskID}`]: task}});
    } catch (e) {
        console.error(`Error during repository addNewTask: ${e}`);
        throw e;
    }
}

async function deleteTask(uuid, taskID) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({uuid: uuid}, {$unset: {[`tasks.${taskID}`]: ""}});
    } catch (e) {
        console.error(`Error during repository deleteTask: ${e}`);
        throw e;
    }
}

async function updateTask(uuid, taskID, task) {
    try {
        return await db.getDb()
            .db()
            .collection('tasks')
            .updateOne({uuid: uuid}, {$set: {[`tasks.${taskID}`]: task}});
    } catch (e) {
        console.error(`Error during repository updateTask: ${e}`);
        throw e;
    }
}

