const express = require('express');
const router = express.Router();
const loginRouter = require('./login/login.route');
const registerRouter = require('./register/register.route');

const routes = () => {

    /*  APPLICATION API  */
    router.use('/createUser', registerRouter);
    router.use('/authUser', loginRouter);
    /*  APPLICATION API  */

    return router;
};

module.exports = routes;
