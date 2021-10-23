const express = require('express');
const router = express.Router();
const {registerService} = require('./register.service');

router.post('', registerRoute);

async function registerRoute(req, res) {
    try {
        console.log('started registerRoute');
        const result = await registerService(req, res);
        if (result.upsertedCount) {
            res.status(201).json({error: false, msg: 'User create successfully, Please log in'});
        } else if (result.matchedCount) {
            res.status(400).json({error: true, msg: 'User already exist'});
        } else {
            throw new Error('failed to register a user');
        }
    } catch (e) {
        console.error(`Error during registerRoute route: ${e}`);
        res.status(500).json({error: true, data: null, msg: e});
    }
}

module.exports = router;
