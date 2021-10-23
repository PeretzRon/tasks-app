const express = require('express');
const router = express.Router();
const {loginService} = require('./login.service');
const logger = require('../../utils/logger')(module);

router.post('', loginRoute);

async function loginRoute(req, res) {
    try {
        logger.info('started loginRoute');
        const {isUserLoggedIn, userData} = await loginService(req, res);
        if (isUserLoggedIn) {
            logger.info(`user ${req.body.email} - login successfully`)
            res.status(200).json({
                error: false,
                data: userData,
                msg: `Hello, ${userData.firstName} ${userData.lastName}`
            });
        } else {
            logger.info(`user ${req.body.email} - wrong User/Password`)
            res.status(400).json({error: true, msg: 'Wrong User/Password'});
        }
    } catch (e) {
        console.logger(`Error during loginRoute route: ${e}`);
        res.status(500).json({error: true, data: null});
    }
}

module.exports = router;
