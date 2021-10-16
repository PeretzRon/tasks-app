const express = require('express');
const router = express.Router();
const loginRouter = require('./login/login.route');

const routes = () => {

    /*  APPLICATION API  */
    // router.use('/register', registerRouter);
    router.use('/authUser', loginRouter);
    /*  APPLICATION API  */

    return router;
};

module.exports = routes;
