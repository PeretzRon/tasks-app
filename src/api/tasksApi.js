const getTasks = async () => {
    try {
        return await fetch('http://localhost:4001/tasks/getTasks', {
            method: 'GET',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            credentials: 'include',
        });
    } catch (error) {
        console.error(error);
        return [];
    }
};

const updateTask = async task => {
    return await fetch('http://localhost:4001/updateTask', {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify({task: task})
    });
};

const deleteTask = async taskID => {
    return await fetch('http://localhost:4001/tasks/deleteTask', {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify({taskID: taskID})
    });
};

const addTask = async task => {
    return await fetch('http://localhost:4001/tasks/addNewTask', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify({task: task})
    });
};

const createUser = async user => {
    return await fetch('http://localhost:4001/createUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(user)
    });
};


const authUser = async userData => {
    return await fetch('http://localhost:4001/authUser', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(userData)
    });
};


module.exports = {
    getTasks,
    updateTask,
    deleteTask,
    addTask,
    createUser,
    authUser,
};
