const express = require('express');
const tasksService = require("./tasks.service");
const router = express.Router();
const logger = require('rp.libs.logger')

router.get('/getTasks', async (req, res) => {
    try {
        logger.info(`user ${req.decoded.uuid} getTasks`, req);
        const results = await tasksService.getTasks(req);
        res.status(200).json({
            error: false,
            data: {tasks: results.tasks, firstName: results.firstName, lastName: results.lastName}
        });
    } catch (error) {
        logger.error(`Error during getTasksRoute route: ${error}`, req);
        res.status(500).json({error: true, data: null});
    }
});

router.post('/addNewTask', async (req, res) => {
    try {
        logger.info(`user ${req.decoded.uuid} addNewTask`, req);
        const result = await tasksService.addNewTask(req);
        if (result) {
            res.status(201).json({_id: result});
        } else {
            throw new Error('failed to add new task');
        }
    } catch (error) {
        logger.error(`Error during getTasksRoute route: ${error}`, req);
        res.status(500).json({error: true, data: null, msg: error});
    }
});

router.delete('/deleteTask', async (req, res) => {
    try {
        logger.info(`user ${req.decoded.uuid} deleteTask`, req);
        const result = await tasksService.deleteTask(req);
        if (result.error) {
            throw new Error(result.msg);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        logger.error(`Error during getTasksRoute route: ${error}`, req);
        res.status(500).json({error: true, msg: error});
    }
});

router.put('/updateTask', async (req, res) => {
    try {
        logger.info(`user ${req.decoded.uuid} updateTask`,req);
        const result = await tasksService.updateTask(req);
        if (result.error) {
            throw new Error(result.msg);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        logger.error(`Error during getTasksRoute route: ${error}`, req);
        res.status(500).json({error: true, msg: error});
    }
});

module.exports = router;
