const express = require('express');
const db = require("../utils/db");
const {encrypt, decrypt} = require('../utils/cryptoAES');
const router = express.Router();
const createToken = require('../utils/createToken');
const {getEncryptedData} = require("../utils/md5");

router.post('/createUser', async (req, res) => {
    const {email, password, ...userDetails} = req.body;
    const uuid = getEncryptedData(`${email}-${password}`);
    let result = await db.getDb()
        .db()
        .collection('tasks')
        .find({uuid: uuid}).count();
    if (result > 0) return res.status(400).json({error: 'User already exist'});

    // Add new user to DB
    // otherDetails.password = encrypt(otherDetails.password);
    result = await db.getDb()
        .db()
        .collection('tasks')
        .insertOne({uuid: uuid, ...userDetails, email: email, tasks: {}});
    if (result) {
        res.status(201).json({msg: 'User create successfully'});
    } else {
        res.status(500).json({error: 'Failed to create user'});
    }
});

router.post('/authUser', async (req, res) => {
    const {email, password} = req.body;
    const uuid = getEncryptedData(`${email}-${password}`);
    let result = await db.getDb()
        .db()
        .collection('tasks')
        .find({uuid: uuid}).toArray();

    if (result.length === 0) return res.status(400).json({error: 'Wrong User/Password'});
    createToken(uuid, res);
    const {firstName, lastName} = result[0];
    res.status(200)
        .json({msg: `Hello, ${firstName} ${lastName}`});
});

module.exports = router;
