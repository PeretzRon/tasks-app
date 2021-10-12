const express = require('express');
const db = require("../utils/db");
const {encrypt, decrypt} = require('../utils/cryptoAES');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/createUser', async (req, res) => {
    const details = req.body;
    const {email, ...otherDetails} = details;
    let result = await db.getDb()
        .db()
        .collection('tasks')
        .find({_id: email}).count();
    if (result > 0) return res.status(400).send('User Exist');

    // Add new user to DB
    otherDetails.password = encrypt(otherDetails.password);
    result = await db.getDb()
        .db()
        .collection('tasks')
        .insertOne({_id: email, ...otherDetails});
    console.log(result);
    if (result)
        res.status(201).send(''); // TODO: change
});

router.post('/authUser', async (req, res) => {
    const {email, password} = req.body;
    let result = await db.getDb()
        .db()
        .collection('tasks')
        .find({_id: email}).toArray();

    let isUserApproved = false;
    if (result.length > 0 && result[0]._id === email) {
        isUserApproved = decrypt(result[0].password) === password;
    }
    if (isUserApproved) {
        const token = jwt.sign({_id: email}, '1231', {expiresIn: '6h'});
        const options = {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 240 // 6 h
        };
        res.cookie('token', token, options).end();
    } else {
        res.status(4001).json({error: 'Access Denied'});
    }
});

router.get('/test', (req, res) => {
    const token = jwt.sign({_id: "sd"}, process.env.JWT_SECURITY_KEY, {expiresIn: '250s'});
    console.log(token);
    const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 10, // 10 min
        domain: 'http://localhost:3000'
    };
    res.cookie('token', token, options);
    res.status(200).end();
});

module.exports = router;
