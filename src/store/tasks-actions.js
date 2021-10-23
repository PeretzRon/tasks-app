import {addTask, deleteTask, updateTask} from "../api/tasksApi";
import {tasksAction} from "./tasks";

export const markToggleCompleteTask = (tasks, id, error) => {
    return async dispatch => {
        const indexToUpdate = tasks.findIndex(task => task._id === id);
        const taskToUpdate = {...tasks[indexToUpdate]};
        taskToUpdate.isDone = !taskToUpdate.isDone;
        const response = await (await updateTask(taskToUpdate)).json();
        if (response.error) {
            error(true);
        } else {
            dispatch(tasksAction.replaceTask({taskToUpdate, indexToUpdate}));
        }
    };
};

export const deleteTaskAction = (tasks, id, callback) => {
    return async dispatch => {
        const response = await (await deleteTask(id)).json();
        if (response.error) {
            callback({msg: response.msg, type: 'error', isAuth: response.isAuth});
        } else {
            const updatedTaskAfterDelete = tasks.filter(value => value._id !== id);
            dispatch(tasksAction.replaceTasks(updatedTaskAfterDelete));
            callback({msg: response.msg, type: 'info', isAuth: response.isAuth});
        }
    };
};

export const addNewTaskAction = (tasks, newTask, callback) => {
    return async dispatch => {
        newTask.isDone = false;
        const response = await (await addTask(newTask)).json();
        if (response.error) {
            callback({error: false, msg: response.msg});
        } else {
            newTask._id = response._id;
            dispatch(tasksAction.addTask(newTask));
            callback({error: false});
        }
    };
};
