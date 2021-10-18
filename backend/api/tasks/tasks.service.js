const tasksRepository = require('./tasks.repository');
const {v4: uuidv4} = require("uuid");

module.exports = {getTasks, addNewTask, deleteTask, updateTask};

async function getTasks(req) {
    try {
        const results = await tasksRepository.getTasks(req.user.uuid);
        const listTasks = [];
        if ((results[0].tasks)) {
            Object.keys(results[0].tasks).forEach(key => {
                listTasks.push({_id: key, ...results[0].tasks[key]});
            });
        }
        return listTasks;
    } catch (e) {
        console.error(`Error during service getTasks: ${e}`);
        return [];
    }
}

async function addNewTask(req) {
    try {
        const task = req.body.task;
        let taskID = uuidv4();
        const result = await tasksRepository.addNewTask(req.user.uuid, taskID, task);
        if (result?.modifiedCount === 0) {
            taskID = null;
        }

        return taskID;
    } catch (e) {
        console.error(`Error during service addNewTask: ${e}`);
        return null;
    }
}

async function deleteTask(req) {
    const response = {error: false, msg: ''};
    try {
        const taskID = req.body.taskID;
        const result = await tasksRepository.deleteTask(req.user.uuid, taskID);
        if (result?.modifiedCount) {
            response.msg = 'Task deleted successfully';
        } else {
            throw new Error('Failed to delete task');
        }
        return response;
    } catch (e) {
        console.error(`Error during service deleteTask: ${e}`);
        response.error = true;
        response.msg = e;
        return response;
    }
}

async function updateTask(req) {
    const response = {error: false, msg: ''};
    try {
        const {_id, ...task} = req.body.task;
        const result = await tasksRepository.updateTask(req.user.uuid, _id, task);
        if (result?.modifiedCount) {
            response.msg = 'Task updated successfully';
        } else {
            throw new Error('Failed to updated task');
        }
        return response;
    } catch (e) {
        console.error(`Error during service updateTask: ${e}`);
        response.error = true;
        response.msg = e;
        return response;
    }
}


