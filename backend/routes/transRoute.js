const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const transRouter = express.Router();
var auth = require('../middleware/auth');

transRouter.use(bodyParser.json());
// post
// buy new stock
transRouter.post('/stock/:userId', auth.verifyUser, (req, res, next) => {
    
});
// TODO
// update
// sell a stock
// buy a stock

module.exports = transRouter;