const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const transRouter = express.Router();
const request = require('request');
var auth = require('../middleware/auth');

require('dotenv').config();
//stockApiUrl: 'https://api.worldtradingdata.com/api/v1/stock'
transRouter.use(bodyParser.json());
// get
transRouter.get('/stock', auth.verifyUser, (req, res, next) => {
    let symbol = req.query.symbol;
    let key = process.env.API_KEY;
    let api = 'https://api.worldtradingdata.com/api/v1/stock'.concat('?symbol=', symbol, '&api_token=', key);
    request(api, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
    });

})
// post
// buy new stock
transRouter.post('/stock/:userId', auth.verifyUser, (req, res, next) => {
    
});
// TODO
// update
// sell a stock
// buy a stock

module.exports = transRouter;