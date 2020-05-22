const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const ROUTE_CONFIG = require('../config/route-config');

const resourcePath = path.join(__dirname, '../resource');

// login request
router.post('/login', (req, res) => {

    const users = JSON.parse(fs.readFileSync(`${resourcePath}/users.json`));

    const matchedUser = users.find(
        t => t.username === req.body.username.toLowerCase() && t.password === req.body.password
    );

    if (matchedUser) {
        const payload = { username: req.body.username };
        const token = jwt.sign(payload, ROUTE_CONFIG.JWT_SECRET_CONFIG, { expiresIn: '1d' });

        return res.json({ success: true, data: matchedUser, token: token });

    } else {
        return res.json(
            { success: false, message: 'UserName or Password is incorrect. Please enter valid username or password' }
        );
    }

});

// signup request
router.post('/signup', (req, res) => {

    let users = JSON.parse(fs.readFileSync(`${resourcePath}/users.json`));

    const isUsernameExist = users.find(t => t.username === req.body.username.toLowerCase());

    if (isUsernameExist) {
        return res.json(
            { success: false, message: 'Username already exist, Please try again with new one' }
        );
    } else {
        const newUser = {
            username: req.body.username, password: req.body.password, role: 'end-user'
        };

        users = [...users, ...[newUser]];

        fs.writeFileSync(`${resourcePath}/users.json`, JSON.stringify(users));

        return res.json({ success: true });
    }

});

/* GET api listing. */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
