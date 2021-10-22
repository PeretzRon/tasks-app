const express = require('express');
const router = express.Router();
const {loginService} = require('./login.service');

router.post('', loginRoute);

async function loginRoute(req, res) {
    try {
        console.log('started loginRoute');
        const {isUserLoggedIn, userData} = await loginService(req, res);
        if (isUserLoggedIn) {
            res.status(200).json({
                error: false,
                data: userData.tasks,
                msg: `Hello, ${userData.firstName} ${userData.lastName}`
            });
        } else {
            res.status(400).json({error: true, msg: 'Wrong User/Password'});
        }
    } catch (e) {
        console.error(`Error during loginRoute route: ${e}`);
        res.status(500).json({error: true, data: null});
    }
}

module.exports = router;
