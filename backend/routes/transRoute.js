const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const transRouter = express.Router();
const request = require('request');
var auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

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
transRouter.post('/user/ultimate/:userId', auth.verifyUser, (req, res, next) => {
    let userId = req.params.userId;
    Users.findByIdAndUpdate(userId, {
        $set: req.body
    }, { new: true })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        })
})
// buy stock
transRouter.post('/stock/buy/:userId', auth.verifyUser, (req, res, next) => {
    var userId = req.params.userId;
    var currentUser = req.headers;
    var token = currentUser.authorization.split(" ")[1];
    currentUser = jwt.decode(token)._id;
    if (currentUser !== userId) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 403, message: "Not allowed" });
    }
    // find the user
    let stocks = []
    let isNewStock = true;
    Users.findById(req.params.userId)
        .then((user) => {
            if (user.balance < req.body.quantity * req.body.price) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json({ status: 403, message: "Not allowed" });
            }
            let temp = user.own_stock;
            stocks = [];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].symbol === req.body.symbol) {
                    isNewStock = false;
                    let old_total = temp[i].quantity * temp[i].price;
                    let new_quantity = temp[i].quantity + req.body.quantity;
                    let new_price = (req.body.quantity * req.body.price + old_total) / new_quantity;
                    newStock = {
                        symbol: temp[i].symbol,
                        quantity: new_quantity,
                        price: new_price
                    }
                    stocks.push(newStock);
                } else {
                    stocks.push(temp[i]);
                }
            }
            let update = {};
            let newBalance = user.balance - (req.body.quantity * req.body.price);
            let newTrans = user.transaction
            newTrans.push({
                stock: req.body.symbol,
                price: req.body.price,
                quantity: req.body.quantity,
                is_sell: false
            });
            if (isNewStock) {
                stocks.push({
                    symbol: req.body.symbol,
                    quantity: req.body.quantity,
                    price: req.body.price
                });
            }
            update = { own_stock: stocks, balance: newBalance, transaction: newTrans };
            console.log(update);
            // do the update
            return Users.findByIdAndUpdate(userId, {
                $set: update
            }, { new: true });
        })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        })
    // need the symbol, price, quantity
});
// update
// sell a stock
transRouter.post('/stock/sell/:userId', auth.verifyUser, (req, res, next) => {
    var userId = req.params.userId;
    var currentUser = req.headers;
    var token = currentUser.authorization.split(" ")[1];
    currentUser = jwt.decode(token)._id;
    if (currentUser !== userId) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 403, message: "Not allowed" });
    }
    // find the user first
    Users.findById(userId)
        .then((user) => {
            let newStocks = [];
            let exist = false;
            let newTran = {};
            let newBalance = 0;
            let temp = {};
            for (let i = 0; i < user.own_stock.length; i++) {
                if (req.body.symbol == user.own_stock[i].symbol) {
                    exist = true
                    if (user.own_stock[i].quantity < req.body.quantity) {
                        res.statusCode = 403;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ status: 403, message: "Quantity is more than what you have" });
                    } else{
                        if(user.own_stock[i].quantity - req.body.quantity > 0){
                            temp = {
                                symbol: user.own_stock[i].symbol,
                                quantity: user.own_stock[i].quantity - req.body.quantity,
                                price: user.own_stock[i].price
                            }
                            newStocks.push(temp);
                        }
                    }
                } else {
                    newStocks.push(user.own_stock[i]);
                }
            }
            if (!exist) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json({ status: 403, message: "does not exist" });
            }else {
                newTran = {
                    stock: req.body.symbol,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    is_sell: true
                };
                let newTrans = user.transaction
                newTrans.push(newTran);
                newBalance = user.balance + req.body.quantity * req.body.price;
                let update = {
                    balance: newBalance,
                    own_stock: newStocks,
                    transaction: newTrans
                }
                return Users.findByIdAndUpdate(userId, {
                    $set: update
                }, { new: true });
             }
        })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        })
})

module.exports = transRouter;