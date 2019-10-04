const express = require('express');
const bodyParser = require('body-parser');
const Transactions = require('../models/transactions');
const transRouter = express.Router();
var auth = require('../middleware/auth');
const transRouter = express.Router();

transRouter.use(bodyParser.json());
// get all trans
transRouter.get(auth.verifyUser, '/:userId', (req, res, next) => {
    
});
// sell a stock
// buy a stock