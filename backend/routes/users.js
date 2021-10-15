const express = require('express');
const db = require("../utils/db");
const {encrypt, decrypt} = require('../utils/cryptoAES');
const router = express.Router();
const createToken = require('../utils/createToken');

router.post('/createUser', async (req, res) => {
    const details = req.body;
    const {email, ...otherDetails} = details;
    let result = await db.getDb()
        .db()
        .collection('tasks')
        .find({_id: email}).count();
    if (result > 0) return res.status(400).json({error: 'User already exist'});

    // Add new user to DB
    otherDetails.password = encrypt(otherDetails.password);
    result = await db.getDb()
        .db()
        .collection('tasks')
        .insertOne({_id: email, ...otherDetails});
    if (result) {
        res.status(201).json({msg: 'User create successfully'});
    } else {
        res.status(500).json({error: 'Failed to create user'});
    }

});

router.post('/authUser', async (req, res) => {
    const {email} = req.body;
    let result = await db.getDb()
        .db()
        .collection('tasks')
        .find({_id: email}).toArray();

    if (result.length === 0) return;
    const {firstName, lastName, _id, password} = result[0]
    let isUserApproved = false;
    if (_id === email) {
        isUserApproved = decrypt(password) === req.body.password;
    }
    if (isUserApproved) {
        createToken(email, res);
        res.status(200)
            .json({msg: `Hello, ${firstName} ${lastName}`});
    } else {
        res.status(401)
            .json({error: 'Wrong User/Password'});
    }
});

module.exports = router;
