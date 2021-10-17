const express = require('express');
const tasksService = require("./tasks.service");
const router = express.Router();

router.get('/getTasks', async (req, res) => {
    try {
        const fetchedTasks = await tasksService.getTasks(req);
        res.status(200).json({error: false, data: fetchedTasks});
    } catch (error) {
        console.error(`Error during getTasksRoute route: ${error}`);
        res.status(500).json({error: true, data: null});
    }
});

router.post('/addNewTask', async (req, res) => {
    try {
        const result = await tasksService.addNewTask(req);
        if (result) {
            res.status(201).json({_id: result});
        } else {
            throw new Error('failed to add new task');
        }
    } catch (error) {
        console.error(`Error during getTasksRoute route: ${error}`);
        res.status(500).json({error: true, data: null, msg: error});
    }
});

router.delete('/deleteTask', async (req, res) => {
    try {
        const result = await tasksService.deleteTask(req);
        if (result.error) {
            throw new Error(result.msg);
        } else {
           res.status(200).json(result);
        }
    } catch (error) {
        console.error(`Error during getTasksRoute route: ${error}`);
        res.status(500).json({error: true, msg: error});
    }
});

module.exports = router;
