const express = require('express');
const db = require("../utils/db");
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const verifyToken = require('../utils/verifyToken');


router.get('/getTasks', verifyToken, async (req, res, next) => {
    const results = await db.getDb()
        .db()
        .collection('tasks')
        .find({_id: req.user._id})
        .project({_id: 0, tasks: 1})
        .toArray();
    const listTasks = [];
    if ((results[0].tasks)) {
        Object.keys(results[0].tasks).forEach(key => {
            listTasks.push({_id: key, ...results[0].tasks[key]});
        });
    }
    res.status(200).json(listTasks);
});

router.put('/updateTask', verifyToken, async (req, res) => {
    const {_id, ...task} = req.body.task;
    const result = await db.getDb()
        .db()
        .collection('tasks')
        .updateOne({_id: req.user._id}, {$set: {[`tasks.${_id}`]: task}});
    if (result?.modifiedCount > 0) {
        res.status(204).send('');
    } else {
        res.status(500).send('error');
    }
});

router.delete('/deleteTask', verifyToken, async (req, res) => {
    const taskID = req.body.taskID;
    const result = await db.getDb()
        .db()
        .collection('tasks')
        .updateOne({_id: req.user._id}, {$unset: {[`tasks.${taskID}`]: ""}});
    if (result?.modifiedCount) {
        res.status(204).end();
    } else {
        res.status(500).send('error');
    }
});

router.post('/addNewTask', verifyToken, async (req, res) => {
    let task = req.body.task;
    const id = uuidv4();
    const result = await db.getDb()
        .db()
        .collection('tasks')
        .updateOne({_id: req.user._id}, {$set: {[`tasks.${id}`]: task}});
    if (result?.modifiedCount > 0) {
        res.status(201).json({_id: id});
    } else {
        res.status(500).json({error: 'error to add new task'});
    }
});


module.exports = router;
