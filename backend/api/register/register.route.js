const express = require('express');
const router = express.Router();
const {registerService} = require('./register.service');
const logger = require('../../utils/logger')(module);


router.post('', registerRoute);

async function registerRoute(req, res) {
    try {
        const result = await registerService(req, res);
        if (result.upsertedCount) {
            logger.info(`create new user finished successfully: email: ${req.body.email}`);
            res.status(201).json({error: false, msg: 'User create successfully, Please log in'});
        } else if (result.matchedCount) {
            logger.warn(`create new user failed user already exist: email: ${req.body.email}`);
            res.status(400).json({error: true, msg: 'User already exist'});
        } else {
            throw new Error('failed to register a user');
        }
    } catch (e) {
        logger.error(`Error during registerRoute route: ${e}`);
        res.status(500).json({error: true, data: null, msg: e});
    }
}

module.exports = router;
