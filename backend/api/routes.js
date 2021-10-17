const express = require('express');
const router = express.Router();
const loginRouter = require('./login/login.route');
const registerRouter = require('./register/register.route');
const tasksRouter = require('./tasks/tasks.route');
const verifyToken = require('../utils/verifyToken');

const routes = () => {

    /*  APPLICATION API  */
    router.use('/createUser', registerRouter);
    router.use('/authUser', loginRouter);
    router.use('/tasks', verifyToken, tasksRouter);
    /*  APPLICATION API  */

    return router;
};

module.exports = routes;
