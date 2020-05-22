const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const ROUTE_CONFIG = require('../config/route-config');

const resourcePath = path.join(__dirname, '../resource');

// Get request with token
router.get('/loan-list/:username', (req, res) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, ROUTE_CONFIG.JWT_SECRET_CONFIG, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Invalid token key' });
            } else {
                const users = JSON.parse(fs.readFileSync(`${resourcePath}/users.json`));
                const loanLists = JSON.parse(fs.readFileSync(`${resourcePath}/loan-details.json`));

                const username = req.params.username;
                let list = [];

                const matchedUser = users.find(t => t.username === username);

                if (matchedUser.role === 'manager') {
                    list = loanLists;
                } else if (matchedUser.role === 'rel-manager') {
                    list = loanLists.filter(t => t.assignedTo === username);
                } else {
                    list = loanLists.filter(t => t.createdBy === username);
                }

                return res.json({ success: true, data: list, message: 'Verified' });
            }
        });
    } else {
        return res.status(403).send({ success: false, message: 'No token provided' });
    }

});

// Save new loan request
router.post('/new-loan', (req, res) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, ROUTE_CONFIG.JWT_SECRET_CONFIG, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Invalid token key' });
            } else {
                const newLoan = req.body;
                let loanLists = JSON.parse(fs.readFileSync(`${resourcePath}/loan-details.json`));

                const lastAssigned = loanLists[loanLists.length - 1].assignedTo;
                let index = Number(lastAssigned[lastAssigned.length - 1]) + 1;
                index = (index <= 4) ? index : 1;
                newLoan.assignedTo = `rel-manager${index}`;
                newLoan.loanStatus = 'Pending';
                newLoan.managerApproval = 'Pending';
                loanLists = [...loanLists, ...[newLoan]];

                fs.writeFileSync(`${resourcePath}/loan-details.json`, JSON.stringify(loanLists));

                return res.json({ success: true, message: 'Verified' });
            }
        });
    } else {
        return res.status(403).send({ success: false, message: 'No token provided' });
    }
});

// update the loan request
router.post('/update-loan', (req, res) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, ROUTE_CONFIG.JWT_SECRET_CONFIG, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Invalid token key' });
            } else {
                let loanLists = JSON.parse(fs.readFileSync(`${resourcePath}/loan-details.json`));

                const matchedLoan = loanLists.find(t => t.id === req.body.id);

                if (matchedLoan) {
                    matchedLoan.loanStatus = req.body.loanStatus;
                    matchedLoan.managerApproval = req.body.managerApproval;
                }

                fs.writeFileSync(`${resourcePath}/loan-details.json`, JSON.stringify(loanLists));

                return res.json({ success: true, message: 'Verified' });
            }
        });
    } else {
        return res.status(403).send({ success: false, message: 'No token provided' });
    }
});

/* GET api listing. */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
